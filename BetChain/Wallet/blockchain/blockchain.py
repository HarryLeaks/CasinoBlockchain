from collections import OrderedDict
from urllib import parse
from flask import Flask, request, render_template
from time import time
from flask_cors import CORS
from flask.json import jsonify
import binascii
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA
from urllib.parse import urlparse
from uuid import uuid4
import json
import hashlib
import requests

MINING_SENDER = 'the Blockchain'
MINING_REWARD = 100
MINING_DIFFICULTY = 4

class Blockchain:
    def __init__(self):
        self.transactions = []
        self.chain = []
        self.nodes = set()
        self.node_id = str(uuid4()).replace('-', '')
        #create the genesis block
        self.create_block(0, '00')

    def register_node(self, node_url):
        parsed_url = urlparse(node_url)
        if parsed_url.netloc:
            self.nodes.add(parsed_url.netloc)
        elif parsed_url.path:
            self.nodes.add(parsed_url.path)
        else:
            raise ValueError('Invalid URL')


    def create_block(self, nonce, previous_hash):
        #add a block of transactions to the blockchain
        block = {
            'block_number': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.transactions,
            'nonce': nonce,
            'previous_hash': previous_hash
        }

        #reset the current list of transactions
        self.transactions = []
        self.chain.append(block)
        return block

    def verify_transaction_signature(self, sender_public_key, signature, transaction):
        public_key = RSA.import_key(binascii.unhexlify(sender_public_key))
        #create the verifier
        verifier = PKCS1_v1_5.new(public_key)
        h = SHA.new(str(transaction).encode('utf8'))

        try:
            #the verify does not return true or false returns an exceptions if something is wrong
            verifier.verify(h, binascii.unhexlify(signature)) #returns true or false
            return True
        except ValueError:
            return False

    @staticmethod
    def valid_proof(transactions, last_hash, nonce, difficulty=MINING_DIFFICULTY):
        guess = (str(transactions) + str(last_hash) + str(nonce)).encode('utf-8')
        h = hashlib.new('sha256')
        h.update(guess)
        guess_hash = h.hexdigest()
        return guess_hash[:difficulty] == '0' * difficulty #returns true if it is


    def proof_of_work(self):
        last_block = self.chain[-1]
        last_hash = self.hash(last_block)
        nonce = 0
        while self.valid_proof(self.transactions, last_hash, nonce) is False:
            nonce += 1
        
        return nonce
    
    @staticmethod
    def hash(block):
        #we must ensure that the dicitonary is ordered, otherwise we'll get inconsistent hashes
        block_string = json.dumps(block, sort_keys=True).encode('utf-8')
        h = hashlib.new('sha256')
        h.update(block_string)
        return h.hexdigest()

    def resolve_conflicts(self):
        neighbours = self.nodes
        new_chain = None

        max_length = len(self.chain)
        for node in neighbours:
            response = requests.get('http://' + node + '/chain')
            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain
        
        #if it has value
        if new_chain:
            self.chain = new_chain
            return True

        return False


    def valid_chain(self, chain):
        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            if block['previous_hash'] != self.hash(last_block):
                return False
            
            transactions = block['transactions'][:-1] #get the transactions of each block except the reward mining transaction
            transaction_elements = ['sender_public_key', 'recipient_public_key', 'amount']
            transactions = [OrderedDict((k, transaction[k]) for k in transaction_elements) for transaction in transactions] #order the transactions 
            
            if not self.valid_proof(transactions, block['previous_hash'], block['nonce'], MINING_DIFFICULTY):
                return False

            last_block = block
            current_index += 1
        
        return True

    def submit_transaction(self, sender_public_key, recipient_public_key, signature, amount):
        #TODO: reward the miner

        transaction = OrderedDict({
            'sender_public_key': sender_public_key,
            'recipient_public_key': recipient_public_key,
            'amount': amount
        })

        #reward for minning the block
        if sender_public_key == MINING_SENDER:
            self.transactions.append(transaction)
            return len(self.chain) + 1
        else:
            #Transaction from wallet to another wallet
            signature_verification = self.verify_transaction_signature(sender_public_key, signature, transaction)
            if signature_verification:
                self.transactions.append(transaction)
                return len(self.chain) + 1
            else:
                return False

#initialize the blockchain
blockchain = Blockchain()         

#instatiate the node
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/configure')
def configure():
    return render_template('./configure.html')

@app.route('/chain', methods=['GET'])
def get_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain)
    }
    return jsonify(response), 200

@app.route('/view/transactions')
def view_transactions():
    return render_template('./view_transactions.html')

@app.route('/mine', methods=['GET'])
def mine():
    #we  run the proof of work
    nonce = blockchain.proof_of_work()

    blockchain.submit_transaction(
        sender_public_key=MINING_SENDER, 
        recipient_public_key=blockchain.node_id,
        signature='',
        amount=MINING_REWARD
    )
    print(blockchain.chain)
    last_block = blockchain.chain[-1] 
    previous_hash = blockchain.hash(last_block)
    block = blockchain.create_block(nonce, previous_hash)

    response = {
        'message': 'New Block created',
        'block_number': block['block_number'],
        'transactions': block['transactions'],
        'nonce': block['nonce'],
        'previous_hash': block['previous_hash']
    }
    return jsonify(response), 200

@app.route('/transactions/get', methods=['GET'])
def get_transactions():
    transactions = blockchain.transactions
    response = {'transactions': transactions}
    return jsonify(response), 200


@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.form

    #check the required values
    required = ['confirmation_sender_public_key', 'confirmation_recipient_public_key', 'transaction_signature', 'confirmation_amount']
    #check if any of the values are empty
    if not all(k in values for k in required):
        return 'Missing values', 400
    print(values)
    
    transaction_results = blockchain.submit_transaction(
        values['confirmation_sender_public_key'],
        values['confirmation_recipient_public_key'],
        values['transaction_signature'],
        values['confirmation_amount']
    )

    if transaction_results == False:
        response = {'message': 'Invalid transaction/signature'}
        return jsonify(response), 406
    else:
        response = {'message': 'Transaction will be added to the block' + str(transaction_results)} 
        return jsonify(response), 201

@app.route('/transactions/new/manual', methods=['POST'])
def new_transaction_manual():
    values = request.get_json(force=True)
    
    transaction_results = blockchain.submit_transaction(
        values['confirmation_sender_public_key'],
        values['confirmation_recipient_public_key'],
        values['transaction_signature'],
        values['confirmation_amount']
    )

    if transaction_results == False:
        response = {'message': 'Invalid transaction/signature'}
        return jsonify(response), 406
    else:
        response = {'message': 'Transaction will be added to the block' + str(transaction_results)} 
        return jsonify(response), 201

@app.route('/nodes/get', methods=['GET'])
def get_nodes():
    nodes = list(blockchain.nodes)
    response = {'nodes': nodes}
    return jsonify(response), 200

@app.route('/nodes/register', methods=['POST'])
def register_node():
    values = request.form
    #127.0.0.1:5002,127.0.0.1:5003,127.0.0.1:5004
    nodes = values.get('nodes').replace(' ', '').split(',')

    if nodes is None:
        return 'Error: Please supplylist of nodes', 400

    for node in nodes:
        blockchain.register_node(node)

    response = {
        'message': 'Nodes have been added',
        'total_nodes': [node for node in blockchain.nodes]
    }
    return jsonify(response), 200

@app.route('/node/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflicts()

    if replaced:
        response = {
            'message': 'Our chain was replaced',
            'new_chain': blockchain.chain
        }
    else:
        response = {
            'message': 'Our chain in authoritative',
            'chain': blockchain.chain
        }
    return jsonify(response), 200

if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5001, type=int, help="port to listen to")
    args = parser.parse_args()
    port = args.port
app.run(host='127.0.0.1', port=port, debug=True)