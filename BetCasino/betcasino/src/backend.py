from flask import Flask, request, jsonify, current_app
from flask_cors import CORS
import mysql.connector
from datetime import datetime
import time
import requests
import random
import socket

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="wallet"
)

app = Flask(__name__)

data = []
logged = False
betcoins = 0

@app.post('/post')
def testPost():
    name = request.json.get('name')
    current_app.logger.debug(name)
    data = name.split(",")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT Nome FROM utilizador WHERE Email = %s AND PalavraPasse = %s", (data[0], data[1]))
    myresult = mycursor.fetchall()
    mycursor.close()

    if len(myresult) != 0:
        logged = True
        return jsonify(name=name)
    else:
        logged = False
        return jsonify(name="0")

@app.route("/sessionStorage",  methods=['POST'])
def sessionStorage():
    email = request.json.get('email')
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM utilizador WHERE Email = %s", (email,))
    myresult = mycursor.fetchall()
    #print(myresult)
    return jsonify(data=myresult)

@app.route('/update', methods=['POST'])
def update():
    data = request.json.get('data')
    data = data.split(',')
    col = data[0]
    content = data[1]
    email = data[2]
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE utilizador SET " + col + " = %s WHERE Email = %s",(content, email))
    mydb.commit()
    if(col != "Email"):
        mycursor.execute("SELECT " + col + " FROM utilizador WHERE Email = %s", (email,))
        myresult = mycursor.fetchall()
        #print(myresult)
        return jsonify(data=myresult)
    else:
        return jsonify(data=email)

@app.route('/getBalance', methods=['POST'])
def getBalance():
    email = request.json.get('email')
    #print(email)
    mycursor = mydb.cursor()
    mycursor.execute("SELECT BetCoins FROM utilizador WHERE Email = %s", (email,))
    myresult = mycursor.fetchall()
    return jsonify(data=myresult)

@app.route('/setBalance', methods=['POST'])
def setBalance():
    global betcoins
    data = request.json.get('data')
    data = data.split(',')
    print(data)
    mycursor = mydb.cursor()
    mycursor.execute("SELECT IdUtilizador, BetCoins FROM utilizador WHERE Email = %s", (data[1],))
    myresult = mycursor.fetchall()
    mycursor.execute("SELECT BetCoins FROM utilizador WHERE Email = %s", ("admin@gmail.com",))
    adminBetCoins = mycursor.fetchall()

    amount = float(data[0]) - myresult[0][1]
    betcoins = myresult[0][1]
    debit = 0
    if(amount < 0):
        adminBetCoins = adminBetCoins[0][0] - amount
        amount = amount * (-1)
        debit = 1
    else:
        adminBetCoins = adminBetCoins[0][0] - amount
        
    mycursor.execute("INSERT INTO beforegametransaction (IdUtilizador, BetAmount, IsDebit) VALUES (%s, %s, %s)", (myresult[0][0], amount, debit))
    mydb.commit()

    mycursor.execute("UPDATE utilizador SET BetCoins = %s WHERE Email = %s",(data[0],data[1]))
    mydb.commit()
    mycursor.execute("UPDATE utilizador SET BetCoins = %s WHERE Email = %s",(adminBetCoins, "admin@gmail.com"))
    mydb.commit()
    return jsonify(data="True")

@app.route('/makeTransaction', methods=['POST'])
def makeTransaction():
    max_port = 0
    for i in range(5001, 5009):
        a_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        location = ("127.0.0.1", i)
        result_of_check = a_socket.connect_ex(location)

        if result_of_check == 0:
            print("Port is open")
        else:
            max_port = i-1
            a_socket.close()
            break
        a_socket.close()

    port = random.randint(5001, max_port)
    port = str(port)
    print(port)
    global betcoins
    ts = time.time()
    timestamp = datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
    data = request.json.get('data')
    data = data.split(',')
    mycursor = mydb.cursor()
    mycursor.execute("SELECT IdUtilizador, BetCoins, PublicAddress, PrivateAddress FROM utilizador WHERE Email = %s", (data[1],))
    myresult = mycursor.fetchall()
    amount = float(data[0]) - betcoins
    print("Amount: ",amount)

    mycursor.execute("SELECT PublicAddress, PrivateAddress FROM utilizador WHERE Email = %s", ("admin@gmail.com",))
    adminAddress = mycursor.fetchall()
    mycursor.execute("SELECT IdBeforeTransaction FROM beforegametransaction ORDER BY IdBeforeTransaction DESC LIMIT 1")
    idbeforetransaction = mycursor.fetchall()
    if(amount < 0):
        amount = amount * (-1)
        mycursor.execute("INSERT INTO transactions (IdBeforeTransaction, SenderPublicAddress, SenderPrivateAddress, ReceiverPublicAddress, MinedTransaction, TimeStamp, Amount, Node) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (idbeforetransaction[0][0], myresult[0][2], myresult[0][3],  adminAddress[0][0], 0, timestamp, amount, port))
        mydb.commit()
        dict = {
        'SenderPublicAddress': str(myresult[0][2]),
        'SenderPrivateAddress': str(myresult[0][3]),
        'ReceiverPublicAddress': str(adminAddress[0][0]),
        'Amount': str(amount)
        }
        response = requests.post('http://127.0.0.1:8081/generate/transaction_manual_backend', json=dict)
        conf_dict = {
            'confirmation_sender_public_key': str(myresult[0][2]),
            'confirmation_recipient_public_key': str(adminAddress[0][0]),
            'transaction_signature': response.json()['signature'],
            'confirmation_amount': str(amount)
        }
        response = requests.post('http://127.0.0.1:'+port+'/transactions/new/manual', json=conf_dict)
    else:
        mycursor.execute("INSERT INTO transactions (IdBeforeTransaction, SenderPublicAddress, SenderPrivateAddress, ReceiverPublicAddress, MinedTransaction, TimeStamp, Amount, Node) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (idbeforetransaction[0][0], adminAddress[0][0], adminAddress[0][1], myresult[0][2], 0, timestamp, amount, port))
        mydb.commit()
        dict = {
        'SenderPublicAddress': str(adminAddress[0][0]),
        'SenderPrivateAddress': str(adminAddress[0][1]),
        'ReceiverPublicAddress': str(myresult[0][2]),
        'Amount': str(amount)
        }
        response = requests.post('http://127.0.0.1:8081/generate/transaction_manual_backend', json=dict)
        conf_dict = {
            'confirmation_sender_public_key':str(adminAddress[0][0]),
            'confirmation_recipient_public_key': str(myresult[0][2]),
            'transaction_signature': response.json()['signature'],
            'confirmation_amount': str(amount)
        }
        response = requests.post('http://127.0.0.1:'+port+'/transactions/new/manual', json=conf_dict)
    return jsonify(data="True")

@app.route('/getTable', methods=['POST'])
def getTable():
    data = request.json.get('email')
    print(data)
    mycursor = mydb.cursor()
    mycursor.execute("SELECT Count(*) FROM beforegametransaction")
    rows = mycursor.fetchall()
    print(rows)

    mycursor.execute("SELECT IdUtilizador FROM utilizador WHERE Email = %s", (data,))
    myresult = mycursor.fetchall()
    print(myresult[0][0])
    mycursor.execute("SELECT BetAmount, isDebit FROM beforegametransaction WHERE IdUtilizador = %s ORDER BY IdBeforeTransaction DESC LIMIT 10", (myresult[0][0],))
    myresult = mycursor.fetchall()
    return jsonify(data=myresult)

@app.route('/getTableTransactions', methods=['POST'])
def getTableTransactions():
    data = request.json.get('email')
    mycursor = mydb.cursor()
    mycursor.execute("SELECT PublicAddress FROM utilizador WHERE Email = %s", (data,))
    myresult = mycursor.fetchall()

    mycursor.execute("SELECT SenderPublicAddress, ReceiverPublicAddress, MinedTransaction, Amount, TimeStamp FROM transactions WHERE SenderPublicAddress = %s or ReceiverPublicAddress = %s", (myresult[0][0], myresult[0][0]))
    myresult = mycursor.fetchall()
    return jsonify(data=myresult)

@app.route('/getTransaction')
def getTransaction():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT IdTransaction, SenderPublicAddress, ReceiverPublicAddress, MinedTransaction, Amount, TimeStamp FROM transactions")
    myresult = mycursor.fetchall()
    print(myresult)
    if myresult:
        for i in (0, len(myresult)-1):
            y = list(myresult[i])
            y[5] = str(myresult[i][5])
            myresult[i] = tuple(y)
    return jsonify(data=myresult)

@app.route("/deleteTransaction", methods=["POST"])
def deleteTransaction():
    max_port = 0
    for i in range(5001, 5009):
        a_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        location = ("127.0.0.1", i)
        result_of_check = a_socket.connect_ex(location)

        if result_of_check == 0:
            print("Port is open")
        else:
            max_port = i-1
            a_socket.close()
            break
        a_socket.close()

    port = random.randint(5001, max_port)
    port = str(port)
    print(port)
    idTransaction = request.json.get('idTransaction')
    print(idTransaction)
    mycursor = mydb.cursor()
    mycursor.execute("SELECT SenderPublicAddress, ReceiverPublicAddress, Amount FROM transactions WHERE IdTransaction = %s", (idTransaction,))
    myresult = mycursor.fetchall()
    #print(myresult)
    mycursor.execute("SELECT BetCoins FROM utilizador WHERE PublicAddress = %s", (myresult[0][0],)) #sender
    senderAmount = mycursor.fetchall()[0][0] + myresult[0][2]
    mycursor.execute("SELECT BetCoins FROM utilizador WHERE PublicAddress = %s", (myresult[0][1],)) #receiver
    receiverAmount = mycursor.fetchall()[0][0] - myresult[0][2]

    mycursor.execute("DELETE FROM transactions WHERE IdTransaction = %s", (idTransaction,))
    mydb.commit()
    mycursor.execute("UPDATE utilizador SET BetCoins = %s WHERE PublicAddress = %s", (senderAmount, myresult[0][0]))
    mydb.commit()
    mycursor.execute("UPDATE utilizador SET BetCoins = %s WHERE PublicAddress = %s", (receiverAmount, myresult[0][1]))
    mydb.commit()

    mycursor.execute("SELECT PrivateAddress FROM utilizador WHERE PublicAddress = %s", (myresult[0][1],))
    privateaddress = mycursor.fetchall()
    print(privateaddress[0][0])

    dict = {
        'SenderPublicAddress': str(myresult[0][1]),
        'SenderPrivateAddress': str(privateaddress[0][0]),
        'ReceiverPublicAddress': str(myresult[0][0]),
        'Amount': str(myresult[0][2])
    } 
    response = requests.post('http://127.0.0.1:8081/generate/transaction_manual_backend', json=dict)
    print(response.json())
    conf_dict = {
        'confirmation_sender_public_key':str(myresult[0][1]),
        'confirmation_recipient_public_key': str(myresult[0][0]),
        'transaction_signature': response.json()['signature'],
        'confirmation_amount': str(myresult[0][2])
    }
    response = requests.post('http://127.0.0.1:'+port+'/transactions/new/manual', json=conf_dict)
    print(response.json())
    return jsonify(data=True)

# because backend and frontend use different ports, we have to enable cross-origin requests
cors = CORS(app, resources={'/*':{'origins': 'http://localhost:3000'}}) 

if __name__ == "__main__":
    app.run()