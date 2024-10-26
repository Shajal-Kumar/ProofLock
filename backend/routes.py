from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from web3 import Web3
from models import db, User, bcrypt
from config import POLYGON_RPC_URL, CONTRACT_ADDRESS, CONTRACT_ABI, PRIVATE_KEY

auth = Blueprint("auth", __name__)

# Roles
VALID_ROLES = ["Forensic Analyst", "Police", "Jury", "Admin"]

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    role = data.get("role", "User")  # Default role
    if role not in VALID_ROLES:
        return jsonify(message="Invalid role provided"), 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    user = User(username=data["username"], password=hashed_password, role=role)
    db.session.add(user)
    db.session.commit()
    return jsonify(message="User registered successfully."), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data["username"]).first()
    if user and user.verify_password(data["password"]):
        access_token = create_access_token(identity={"username": user.username, "role": user.role})
        return jsonify(access_token=access_token)
    return jsonify(message="Invalid credentials"), 401

# Route to submit evidence, restricted to specific roles
@auth.route("/submit_evidence", methods=["POST"])
@jwt_required()
def submit_evidence():
    user = get_jwt_identity()
    if user["role"] not in ["Forensic Analyst", "Police"]:
        return jsonify(message="Unauthorized: Insufficient permissions."), 403

    data = request.get_json()
    ipfs_hash = data["ipfsHash"]

    # Initialize Web3
    web3 = Web3(Web3.HTTPProvider(POLYGON_RPC_URL))
    
    # Load the contract
    contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

    # Set up transaction details
    account_address = web3.eth.account.from_key(PRIVATE_KEY).address
    nonce = web3.eth.get_transaction_count(account_address)
    transaction = contract.functions.submitEvidence(ipfs_hash).build_transaction({
        'chainId': 80001,
        'gas': 200000,
        'gasPrice': web3.to_wei('2', 'gwei'),
        'nonce': nonce,
    })

    # Sign and send the transaction
    signed_tx = web3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

    return jsonify(message="Evidence submitted successfully.", ipfs_hash=ipfs_hash, transaction_hash=web3.to_hex(tx_hash)), 200

@auth.route("/view_all_evidence", methods=["GET"])
@jwt_required()
def view_all_evidence():
    user = get_jwt_identity()
    if user["role"] not in ["Admin", "Jury"]:
        return jsonify(message="Unauthorized: Insufficient permissions."), 403

    # Logic to fetch and return all evidence (Placeholder)
    evidence_data = {}  # Replace with your retrieval logic
    return jsonify(evidence_data), 200

@auth.route("/delete_evidence", methods=["DELETE"])
@jwt_required()
def delete_evidence():
    user = get_jwt_identity()
    if user["role"] != "Admin":
        return jsonify(message="Unauthorized: Admin permissions required."), 403

    # Logic to delete evidence (Placeholder)
    data = request.get_json()
    evidence_id = data.get("evidenceId")
    # Implement deletion logic based on `evidence_id`
    
    return jsonify(message="Evidence deleted successfully."), 200
