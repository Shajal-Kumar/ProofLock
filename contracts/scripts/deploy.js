async function main() {
  // Get the contract factory
  const EvidenceSystem = await ethers.getContractFactory("EvidenceSystem");

  // Deploy the contract
  console.log("Deploying EvidenceSystem...");
  const evidenceSystem = await EvidenceSystem.deploy();

  // Wait for the deployment to complete
  await evidenceSystem.waitForDeployment();

  // Log the deployed contract address
  console.log("EvidenceSystem deployed to:", await evidenceSystem.getAddress());
}

// Run the main function and catch any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });