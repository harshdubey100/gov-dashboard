import React, { useState } from "react";
import axios from "axios";

const UploadLandDocument = () => {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");

    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;  // Replace with your Pinata API Key
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_KEY;  // Replace with your Pinata Secret Key

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Upload file to IPFS via Pinata
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const metadata = JSON.stringify({ name: file.name });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({ cidVersion: 1 });
        formData.append("pinataOptions", options);

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxBodyLength: "Infinity",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretApiKey,
                    },
                }
            );

            setCid(res.data.IpfsHash);
            alert(`File uploaded successfully! CID: ${res.data.IpfsHash}`);
        } catch (error) {
            console.error("IPFS Upload Error:", error);
            alert("Upload failed. Please check console for details.");
        }
    };

    return (
        <div>
            <h2>Upload Land Document</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload to IPFS</button>
            {cid && <p>Uploaded File CID: <b>{cid}</b></p>}
        </div>
    );
};

export default UploadLandDocument;
