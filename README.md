#####################################

```
# ProofLock - The Immutable Digital Evidence Storage

ProofLock is a decentralized digital evidence storage system that enables users to securely upload, verify, and timestamp digital files on the blockchain. The project utilizes **Polygon** for immutable blockchain storage, **Pinata** for decentralized file storage via IPFS, **React** with **DaisyUI** for the frontend, **Vite** for fast builds, and **Flask** for secure authentication and authorization.

## **Table of Contents**

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)
    - [1. Frontend Setup (React + Vite + DaisyUI)](#1-frontend-setup-react--vite--daisyui)
    - [2. Backend Setup (Flask)](#2-backend-setup-flask)
    - [3. Smart Contract Deployment (Polygon)](#3-smart-contract-deployment-polygon)
    - [4. Pinata IPFS Integration](#4-pinata-ipfs-integration)
- [Usage](#usage)

---

## **Technologies Used**

- **Frontend**: React, Vite, DaisyUI
- **Backend**: Flask (for authentication and authorization)
- **Blockchain**: Polygon (for decentralized, immutable evidence storage)
- **IPFS**: Pinata (for decentralized file storage)
- **Authentication**: JSON Web Tokens (JWT) with Flask

---

## **Features**

1. **Decentralized Evidence Storage**: Uploads and timestamps digital evidence on the Polygon blockchain, ensuring immutability and transparency.
2. **IPFS File Storage**: Leverages Pinata to store digital files on IPFS, storing only the hash on-chain to reduce costs.
3. **Secure Authentication**: Flask backend manages user authentication using JWT for safe, authenticated API interactions.
4. **User Interface**: Built using React with DaisyUI for a sleek and user-friendly design.

---

## **Project Setup**

### **1. Frontend Setup (React + Vite + DaisyUI)**

1. **Clone the repository** and navigate to the frontend directory:
  
    `git clone https://github.com/yourusername/prooflock.git cd prooflock/frontend`
  
2. **Install dependencies**:
  
    `npm install`
  
3. **Environment Variables**: Create a `.env` file in the `frontend` directory to configure environment variables like the contract address and API endpoints.
  
   `VITE_APP_POLYGON_CONTRACT_ADDRESS=your_polygon_contract_address  `  
   `VITE_APP_BACKEND_URL=http://localhost:5000/api  `
1. **Run the frontend**:
  
    `npm run dev`
  
5. **Access the frontend**: Click on the address provided in the console.
  

---

### **2. Backend Setup (Flask)**

1. **Navigate to the backend directory**:
    `cd ../backend`
2. **Create a virtual environment** (optional but recommended):
    `python3 -m venv venv source venv/bin/activate`
3. **Install Flask and other dependencies**:
    `pip install -r requirements.txt`
4. **Environment Variables**: Set up a `.env` file in the `backend` directory for configuration:
  
   `FLASK_SECRET_KEY=your_secret_key JWT_SECRET_KEY=your_jwt_secret_key  `  
   `PINATA_API_KEY=your_pinata_api_key  `  
   `PINATA_SECRET_API_KEY=your_pinata_secret_key  `  
   `POLYGON_RPC_URL=https://polygon-mumbai.infura.io/v3/YOUR_INFURA_PROJECT_ID  `  
   `CONTRACT_ADDRESS=your_polygon_contract_address  `
  
6. **Run the backend**:
    `flask run`
7. **Access the backend API**: The backend API will be available at `http://localhost:5000/api`.
  

---

### **3. Smart Contract Deployment (Polygon)**

1. **Write a Smart Contract**: Use Solidity to create the contract for storing evidence hashes on the blockchain.
  
2. **Deploy the Contract**:
  
    - Use **Remix IDE** or **Hardhat** to deploy the smart contract to the Polygon Mumbai Testnet.
    - **MetaMask** wallet is required to deploy and test transactions on Polygon.
3. **Copy the Contract Address**: Update the environment variables in both frontend and backend `.env` files with your deployed contract address.
  

---

### **4. Pinata IPFS Integration**

1. **Create a Pinata Account**: Go to [Pinata](https://pinata.cloud/) and create an account to get API keys.
  
2. **Generate API Keys**: In your Pinata account, generate an API Key and Secret Key for uploading files to IPFS.
  
3. **Configure Backend**: Add the API keys to the `.env` file in the backend:
  
   `PINATA_API_KEY=your_pinata_api_key  `  
   `PINATA_SECRET_API_KEY=your_pinata_secret_key  `
  
5. **File Upload Functionality**: In the backend, use Pinata’s API to upload files to IPFS. The response will contain the IPFS hash, which is stored on the blockchain through the smart contract.
  

---

## **Usage**

1. **User Registration/Login**:
  
    - Users must register and log in to access ProofLock’s services.
    - JWT is used to authorize and authenticate users.
2. **File Upload**:
  
    - After authentication, users can upload a file, which is then stored on IPFS using Pinata.
    - The IPFS hash of the file is generated and sent to the smart contract on the Polygon blockchain.
    - Users can also append new evidence to the existing evidence chain.
3. **Evidence Verification**:
  
    - Users can query the blockchain to verify the existence and integrity of previously submitted evidence.
4. **Viewing Evidence**:
  
    - Users can retrieve metadata of the evidence stored, such as timestamp and file hash, to ensure it hasn’t been altered.
    - Users also have the ability to actually view the evidence and not only the metadata.

---

### **Contributing**

Contributions are welcome! Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request.

### **Contact**

For further questions or suggestions, feel free to reach out at shajalapsdel@gmail.com or vijaykumarkvs2004@gmail.com.

```
