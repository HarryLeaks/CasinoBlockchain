from flask import Flask, request, jsonify, render_template
import mysql.connector
import Crypto
import Crypto.Random
from Crypto.PublicKey import RSA
import binascii
from collections import OrderedDict
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="wallet"
)

class Transaction: 
    def __init__(self, sender_public_key, sender_private_key, recipient_public_key, amount):
        self.sender_public_key = sender_public_key
        self.sender_private_key = sender_private_key
        self.recipient_public_key = recipient_public_key
        self.amount = amount

    def to_dict(self):
        return OrderedDict({
            'sender_public_key': self.sender_public_key,
            'recipient_public_key': self.recipient_public_key,
            'amount': self.amount
        })

    def sign_transaction(self):
        private_key = RSA.importKey(binascii.unhexlify(self.sender_private_key))
        signer = PKCS1_v1_5.new(private_key)
        hash = SHA.new(str(self.to_dict()).encode('utf8')) #create the hash the hole string
        return binascii.hexlify(signer.sign(hash)).decode('ascii') #return the signature
    
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/generate/transaction')
def generate_transaction():
    mycursor = mydb.cursor()
    mycursor.execute('SELECT SenderPublicAddress, SenderPrivateAddress, ReceiverPublicAddress, Amount FROM transactions ORDER BY IdTransaction DESC LIMIT 1')
    myresult = mycursor.fetchall()

    sender_public_key = myresult[0][0]
    sender_private_key = myresult[0][1]
    recipient_public_key = myresult[0][2]
    amount = myresult[0][3]

    transaction = Transaction(sender_public_key, sender_private_key, recipient_public_key, amount)
    response = {'transaction': transaction.to_dict(), #convert to a dictionary
                'signature': transaction.sign_transaction()}

    return jsonify(response), 200

@app.route('/generate/transaction_manual', methods=['POST'])
def generate_transaction_manual():
    values = request.form
    print(values)

    #check the required values
    required = ['SenderPublicAddress', 'SenderPrivateAddress', 'ReceiverPublicAddress', 'Amount']
    #check if any of the values are empty
    if not all(k in values for k in required):
        return 'Missing values', 400
    print(values)
    
    transaction = Transaction(
        values['SenderPublicAddress'],
        values['SenderPrivateAddress'],
        values['ReceiverPublicAddress'],
        values['Amount']
    )

    response = {
        'transaction': transaction.to_dict(),
        'signature': transaction.sign_transaction()
    }
    return jsonify(response), 200

@app.route('/generate/transaction_manual_backend', methods=['POST'])
def generate_transaction_manual_backend():
    values = request.get_json(force=True) 
        
    transaction = Transaction(
        values['SenderPublicAddress'],
        values['SenderPrivateAddress'],
        values['ReceiverPublicAddress'],
        values['Amount']
    )

    response = {
        'transaction': transaction.to_dict(),
        'signature': transaction.sign_transaction()
    }
    return jsonify(response), 200


@app.route('/view/transactions')
def view_transactions():
    return render_template('./view_transactions.html')

@app.route('/wallet/new')
def new_wallet():
    random_gen = Crypto.Random.new().read
    private_key = RSA.generate(1024, random_gen)
    public_key = private_key.public_key()

    response = {
        'private_key': binascii.hexlify(private_key.export_key(format('DER'))).decode('ascii'),
        'public_key':  binascii.hexlify(public_key.export_key(format('DER'))).decode('ascii')
    }

    return jsonify(response) #converts the dictionary to a javascript format

if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=8081, type=int, help="port to listen to")
    args = parser.parse_args()
    port = args.port

app.run(host='127.0.0.1', port=port, debug=True)