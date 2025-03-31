import React, { useState } from "react";
import { getContract } from "../services/contract";

const ApproveSale = () => {
    const [tokenId, setTokenId] = useState("");
    const [buyer, setBuyer] = useState("");
    const [newOwnerName, setNewOwnerName] = useState("");
    const [newMetadataCID, setNewMetadataCID] = useState(""); // Added metadata CID input

    const approveSale = async () => {
        try {
            const contract = await getContract();
            const tx = await contract.approveSale(
                parseInt(tokenId), 
                buyer, 
                newOwnerName, 
                newMetadataCID // Added new metadata CID
            );
            await tx.wait();
            alert("Sale Approved Successfully!");
        } catch (error) {
            console.error("Approval Error:", error);
            alert(`Sale Approval Failed: ${error.message || "Unknown error"}`);
        }
    };

    return (
        <div>
            <h2>Approve Land Sale</h2>
            <input 
                type="number" 
                placeholder="Token ID" 
                value={tokenId} 
                onChange={(e) => setTokenId(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Buyer Address" 
                value={buyer} 
                onChange={(e) => setBuyer(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="New Owner Name" 
                value={newOwnerName} 
                onChange={(e) => setNewOwnerName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="New Metadata CID" 
                value={newMetadataCID} 
                onChange={(e) => setNewMetadataCID(e.target.value)} 
            />
            <button onClick={approveSale}>Approve</button>
        </div>
    );
};

export default ApproveSale;
