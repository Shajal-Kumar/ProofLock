import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# Polygon Mumbai RPC URL
POLYGON_RPC_URL = "https://rpc-mumbai.maticvigil.com/"

# Smart contract address on Polygon Mumbai
CONTRACT_ADDRESS = "0xYourContractAddress"

# Contract ABI - You can fetch this from the compiled contract JSON file
CONTRACT_ABI = [
    {
        "constant": False,
        "inputs": [{"name": "_ipfsHash", "type": "string"}],
        "name": "submitEvidence",
        "outputs": [],
        "payable": False,
        "stateMutability": "nonpayable",
        "type": "function",
    }
]

# Secret values
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
