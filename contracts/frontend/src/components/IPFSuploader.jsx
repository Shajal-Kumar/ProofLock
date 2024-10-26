// src/IPFSUploader.js
import React, { useState } from 'react';
import axios from 'axios';

const IPFSUploader = () => {
    const [file, setFile] = useState(null);
    const [ipfsHash, setIpfsHash] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadToIPFS = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'https://ipfs.infura.io:5001/api/v0/add',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Basic ' + btoa('YOUR_INFURA_PROJECT_ID:78f81435a2394e5aa6b1fe28b5799c24'),
                    },
                }
            );
            setIpfsHash(response.data.Hash);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">IPFS File Uploader</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
            />
            <button
                onClick={uploadToIPFS}
                className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 hover:bg-blue-600 transition"
            >
                Upload to IPFS
            </button>
            {ipfsHash && (
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold">File uploaded successfully!</h2>
                    <p className="mt-2">IPFS Hash: {ipfsHash}</p>
                    <a
                        href={`https://ipfs.io/ipfs/${ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        View File on IPFS
                    </a>
                </div>
            )}
        </div>
    );
};

export default IPFSUploader;
