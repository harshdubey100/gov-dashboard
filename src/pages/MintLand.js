import React, { useState } from "react";
import { getContract } from "../services/contract";
import "./MintLand.css";

const MintLand = () => {
    const [formData, setFormData] = useState({
        owner: "",
        ownerName: "",
        location: "",
        plotNumber: "",
        metadataCID: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const mintLand = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.mintNFTToLandowner(
                formData.owner,
                formData.ownerName,
                formData.location,
                parseInt(formData.plotNumber),
                formData.metadataCID
            );
            await tx.wait();
            alert("Land NFT Minted Successfully!");
        } catch (error) {
            console.error("Minting Error:", error);
        }
    };

    return (
        <div className="mint-land-wrapper">
            <h2>Mint New Land</h2>
            <input type="text" name="owner" placeholder="Owner Address" onChange={handleChange} />
            <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} />
            <input type="number" name="plotNumber" placeholder="Plot Number" onChange={handleChange} />
            <input type="text" name="metadataCID" placeholder="Metadata CID" onChange={handleChange} />
            <button onClick={mintLand}>Mint Land</button>
        </div>
    );
};

export default MintLand;
