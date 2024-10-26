const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak256, defaultAbiCoder } = ethers.utils; // Import keccak256 and defaultAbiCoder

describe("EvidenceSystem", function () {
    let evidenceSystem;
    let owner;

    beforeEach(async function () {
        // Deploy the EvidenceSystem contract before each test
        const EvidenceSystem = await ethers.getContractFactory("EvidenceSystem");
        evidenceSystem = await EvidenceSystem.deploy();
        await evidenceSystem.waitForDeployment();

        // Get the signer who will submit evidence
        [owner] = await ethers.getSigners();
    });

    it("should submit new evidence", async function () {
        const ipfsHash = "QmSomeHashValue";
        
        // Submit evidence and wait for the transaction
        const tx = await evidenceSystem.submitEvidence(ipfsHash);
        await tx.wait();
        
        // Get the block timestamp
        const block = await ethers.provider.getBlock(tx.blockNumber);
        
        // Generate the evidence ID the same way as the contract
        const evidenceId = keccak256(
            defaultAbiCoder.encode(
                ["string", "address", "uint256"],
                [ipfsHash, owner.address, block.timestamp]
            )
        );

        // Verify the evidence
        const evidence = await evidenceSystem.evidences(evidenceId);
        expect(evidence.ipfsHash).to.equal(ipfsHash);
        expect(evidence.submitter).to.equal(owner.address);
        expect(evidence.timestamp).to.equal(block.timestamp);
    });

    it("should not allow submitting the same evidence twice", async function () {
        const ipfsHash = "QmSomeHashValue";
        
        // Submit first time
        const tx = await evidenceSystem.submitEvidence(ipfsHash);
        await tx.wait();
        
        // Try to submit the same evidence with the same parameters
        await expect(
            evidenceSystem.submitEvidence(ipfsHash)
        ).to.be.revertedWith("Evidence already exists.");
    });

    it("should verify submitted evidence", async function () {
        const ipfsHash = "QmSomeHashValue";
        
        // Submit evidence and wait for the transaction
        const tx = await evidenceSystem.submitEvidence(ipfsHash);
        await tx.wait();
        
        // Get the block timestamp
        const block = await ethers.provider.getBlock(tx.blockNumber);
        
        // Generate the evidence ID
        const evidenceId = keccak256(
            defaultAbiCoder.encode(
                ["string", "address", "uint256"],
                [ipfsHash, owner.address, block.timestamp]
            )
        );

        // Verify the evidence
        const evidence = await evidenceSystem.verifyEvidence(evidenceId);
        expect(evidence.ipfsHash).to.equal(ipfsHash);
        expect(evidence.submitter).to.equal(owner.address);
        expect(evidence.timestamp).to.equal(block.timestamp);
    });

    it("should revert when verifying non-existent evidence", async function () {
        const nonExistentId = keccak256(
            defaultAbiCoder.encode(
                ["string", "address", "uint256"],
                ["QmNonExistentHash", owner.address, 1234567890]
            )
        );
        
        await expect(
            evidenceSystem.verifyEvidence(nonExistentId)
        ).to.be.revertedWith("Evidence does not exist.");
    });
});