import React, { useState } from "react";
import axios from "axios";

const CreateMetadata = ({ onMetadataCID }) => {
    const [formData, setFormData] = useState({
        ownerAddress: "",
        ownerName: "",
        location: "",
        plotNumber: "",
        landDocumentCID: ""
    });
    const [metadataCID, setMetadataCID] = useState("");
    const [loading, setLoading] = useState(false);

    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;  // Replace with your Pinata API Key
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_KEY;  // Replace with your Pinata Secret Key

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Upload metadata JSON to IPFS
    const uploadMetadataToIPFS = async () => {
        if (!formData.ownerAddress || !formData.ownerName || !formData.location || !formData.plotNumber || !formData.landDocumentCID) {
            alert("Please fill in all fields.");
            return;
        }

        const metadata = {
            pinataContent: {
                ownerAddress: formData.ownerAddress,
                ownerName: formData.ownerName,
                location: formData.location,
                plotNumber: formData.plotNumber,
                landDocumentCID: formData.landDocumentCID,
            },
            pinataMetadata: {
                name: `LandMetadata_${Date.now()}`,
            }
        };

        setLoading(true);
        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                metadata,
                {
                    headers: {
                        "Content-Type": "application/json",
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretApiKey,
                    },
                }
            );

            const cid = res.data.IpfsHash;
            setMetadataCID(cid);
            
            // Check if onMetadataCID is a function before calling it
            if (typeof onMetadataCID === "function") {
                onMetadataCID(cid);
            }

            alert(`Metadata uploaded successfully! CID: ${cid}`);
        } catch (error) {
            console.error("IPFS Metadata Upload Error:", error);
            alert("Metadata upload failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Metadata</h2>
            <input type="text" name="ownerAddress" placeholder="Owner Wallet Address" onChange={handleChange} />
            <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} />
            <input type="number" name="plotNumber" placeholder="Plot Number" onChange={handleChange} />
            <input type="text" name="landDocumentCID" placeholder="Land Document CID (Manually Entered)" onChange={handleChange} />
            <button onClick={uploadMetadataToIPFS} disabled={loading}>
                {loading ? "Uploading..." : "Create & Upload Metadata"}
            </button>
            {metadataCID && <p>Metadata CID: <b>{metadataCID}</b></p>}
        </div>
    );
};

export default CreateMetadata;
