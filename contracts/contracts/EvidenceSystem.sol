// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EvidenceSystem {
    struct Evidence {
        string ipfsHash;
        address submitter;
        uint256 timestamp;
    }
    mapping(bytes32 => Evidence) public evidences;

    function submitEvidence(string memory _ipfsHash) public {
        bytes32 evidenceId = keccak256(
            abi.encodePacked(_ipfsHash, msg.sender, block.timestamp)
        );
        require(
            evidences[evidenceId].timestamp == 0,
            "Evidence already exists."
        );
        evidences[evidenceId] = Evidence(
            _ipfsHash,
            msg.sender,
            block.timestamp
        );
    }

    function verifyEvidence(
        bytes32 _evidenceId
    ) public view returns (Evidence memory) {
        require(
            evidences[_evidenceId].timestamp != 0,
            "Evidence does not exist."
        );
        return evidences[_evidenceId];
    }
}
