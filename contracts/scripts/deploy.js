// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Retrieve the contract to deploy
    const EvidenceSystem = await ethers.getContractFactory("EvidenceSystem");
  
    console.log("Deploying EvidenceSystem...");
    
    // Deploy the contract
    const evidenceSystem = await EvidenceSystem.deploy();
  
    await evidenceSystem.waitForDeployment();
  
    // Log the contract address
    console.log("EvidenceSystem deployed to:", evidenceSystem.getAddress());
  }
  
  // Run the deployment script and handle any errors
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
``  