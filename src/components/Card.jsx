import React, { useState } from "react";
import { ethers } from "ethers";
import EvidenceSystem from "./EvidenceSystem.json";
import { PinataSDK } from "pinata-web3";
import { BrowserProvider } from "ethers";
import Submit from "./Submit";

const pinata = new PinataSDK({
  pinataJwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMjkwZWU1NC0yMzIzLTQ2MzItYTg1My1hYzk3ODBlNDVlMTYiLCJlbWFpbCI6InZpamF5a3VtYXJkdHUyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGRlZmFlODU4YTQ4ZTEyOGY2NzAiLCJzY29wZWRLZXlTZWNyZXQiOiIzOTRiYzY2MjgzZGJjOWQ2NTAzZmIwMGZjMGVmNzc3YjM0NGViOTY3YzMzNDVkZTZmMDFlODRlMzZmOThlYjc3IiwiZXhwIjoxNzYxNDc3MDM2fQ.VkOgdYLY8uCBN9kTx_1sHwVkf0-pFzl8reF6L-5UP5k`,
  pinataGateway: `blush-left-roadrunner-957.mypinata.cloud`,
});

const Cards = () => {
  const [evidence, setEvidence] = useState("");
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [message, setMessage] = useState("");
  const [retrievedEvidence, setRetrievedEvidence] = useState(null);
  const [txhash, setTxhash] = useState("")

  const handleEvidenceChange = (e) => {
    setEvidence(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (showModal) => {
    if (!window.ethereum) {
      setMessage("Please install MetaMask");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new BrowserProvider(window.ethereum);
    console.log("This is provider", provider);
    const signer = await provider.getSigner();
    console.log("contactAddress is ", process.env.CONTRACT_ADDRESS);
    console.log("signer", signer);
    let CONTRACT_ADDRESS = "0x585F6E0f2D7572064Dd68F97e3203e186Ba1924C";
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      EvidenceSystem.abi,
      signer
    );

    try {
      let ipfsHash;
      if (file) {
        const upload = await pinata.upload.file(file);
        ipfsHash = upload.IpfsHash;
        setIpfsHash(ipfsHash);
      }

      const tx = await contract.submitEvidence(ipfsHash);
      await tx.wait();
      setTxhash(tx.hash)
      setMessage("Evidence submitted successfully");
      showModal(); 
    } catch (error) {
      console.error("Error submitting evidence:", error);
      setMessage("Error submitting evidence");
    }
  };

  const handleRetrieve = async () => {
    if (!window.ethereum) {
      setMessage("Please install MetaMask");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new BrowserProvider(window.ethereum);
    console.log("this hsit runs", provider);
    let CONTRACT_ADDRESS = "0x585F6E0f2D7572064Dd68F97e3203e186Ba1924C";
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      EvidenceSystem.abi,
      provider
    );

    try {
      const evidenceId = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(ipfsHash)
      );
      console.log(evidenceId);
      const evidence = await contract.verifyEvidence(evidenceId);
      setRetrievedEvidence(evidence);
    } catch (error) {
      console.error("Error retrieving evidence:", error);
      setMessage("Error retrieving evidence");
    }
  };

  return (
    <div className="flex flex-row flex-wrap mt-10 pt-10 justify-center text-white">
      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
        <figure className="px-10 pt-5">
          <img
            src="https://static.thenounproject.com/png/7319334-512.png"
            alt="Shoes"
            className="size-10"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Upload Evidence</h2>
          <input
            type="file"
            className="mt-5 file-input file-input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700"
            onChange={handleFileChange}
          />
          <div className="mt-5 card-actions">
            <Submit handleSubmit={handleSubmit} message={message} transactionHash={txhash}/>
          </div>
        </div>
      </div>

      {/* dont mind this */}

      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
        <figure className="px-10 pt-5">
          <img
            src="https://static.thenounproject.com/png/7332459-512.png"
            alt="Shoes"
            className="rounded-full p-1 border-[3px] border-black size-10"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">View Evidence</h2>
          <input
            type="text"
            placeholder="Enter Case ID"
            className="mt-5 input input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700"
          />
          <div className="mt-5 card-actions">
            <Submit />
          </div>
        </div>
      </div>

      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
        <figure className="px-10 pt-5">
          <img
            src="https://static.thenounproject.com/png/2709634-512.png"
            alt="Shoes"
            className="size-10"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Verify Evidence</h2>
          <input
            type="text"
            placeholder="Enter Case ID"
            className="mt-5 input input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700"
          />
          <div className="mt-5 card-actions">
            <Submit />
          </div>
        </div>
      </div>

      <div className="card bg-purple-700 w-96 shadow-xl m-2 hover:bg-white hover:text-purple-700">
        <figure className="px-10 pt-5">
          <img
            src="https://static.thenounproject.com/png/6735925-512.png"
            alt="Shoes"
            className="size-10"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Append to Evidence Chain</h2>
          <input
            type="text"
            placeholder="Enter Case ID"
            className="mt-5 input input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700"
          />
          <input
            type="file"
            className="mt-3 file-input file-input-ghost w-full max-w-xs border-2 border-white hover:border-purple-700"
          />
          <div className="card-actions">
            <Submit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
