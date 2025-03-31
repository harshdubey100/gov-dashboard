import React, { useState } from "react";
import { getContract } from "../services/contract";
import { ZeroAddress } from "ethers"; // Import constants from ethers

const ApproveSale = () => {
    const [tokenId, setTokenId] = useState("");
    const [buyer, setBuyer] = useState("");
    const [newOwnerName, setNewOwnerName] = useState("");
    const [newMetadataCID, setNewMetadataCID] = useState("");
    const [saleStatus, setSaleStatus] = useState("");
    const [saleBuyer, setSaleBuyer] = useState("");

    // Function to check if the land is listed for sale
    const checkSaleStatus = async () => {
        try {
            console.log("Checking sale status for Token ID:", tokenId);
            const contract = await getContract();
            console.log("Contract instance obtained:", contract);
            const landDetails = await contract.getLandDetails(parseInt(tokenId));
            console.log("Land Details:", landDetails);

            if (landDetails[5] !== ZeroAddress) {
                setSaleStatus("Land is listed for sale.");
                setSaleBuyer(landDetails[5]);
                console.log("Land is listed. Buyer:", landDetails[5]);
            } else {
                setSaleStatus("Land is not listed for sale.");
                setSaleBuyer("");
                console.log("Land is NOT listed for sale.");
            }
        } catch (error) {
            console.error("Error checking sale status:", error);
            setSaleStatus("Error checking sale status.");
        }
    };

    const approveSale = async () => {
        console.log("Attempting to approve sale...");
        console.log("Token ID:", tokenId);
        console.log("Buyer Address:", buyer);
        console.log("New Owner Name:", newOwnerName);
        console.log("New Metadata CID:", newMetadataCID);

        if (!tokenId || isNaN(tokenId)) {
            alert("Invalid Token ID");
            console.log("Error: Invalid Token ID");
            return;
        }
    
        if (!buyer || buyer.toLowerCase() === ZeroAddress.toLowerCase()) {
            alert("Invalid Buyer Address");
            console.log("Error: Invalid Buyer Address");
            return;
        }
    
        if (!newOwnerName || newOwnerName.trim() === "") {
            alert("Invalid New Owner Name");
            console.log("Error: Invalid New Owner Name");
            return;
        }
    
        if (!newMetadataCID || newMetadataCID.trim() === "") {
            alert("Invalid New Metadata CID");
            console.log("Error: Invalid New Metadata CID");
            return;
        }
    
        try {
            console.log("Fetching contract...");
            const contract = await getContract();
            console.log("Contract obtained:", contract);
            
            console.log("Fetching current owner of token:");
            const currentOwner = await contract.ownerOf(parseInt(tokenId));
            console.log("Current Owner:", currentOwner);
            
            console.log("Fetching land details before approval...");
            const landDetails = await contract.getLandDetails(parseInt(tokenId));
            console.log("Land Details:", landDetails);
            
            if (landDetails[5] === ZeroAddress) {
                alert("This land is not listed for sale!");
                console.log("Error: Land is not listed for sale!");
                return;
            }

            if (landDetails[5].toLowerCase() !== buyer.toLowerCase()) {
                alert(`Buyer address mismatch! Expected: ${landDetails[5]}, Got: ${buyer}`);
                console.log("Error: Buyer address mismatch!", landDetails[5], buyer);
                return;
            }

            console.log("Calling approveSale function...");
            const tx = await contract.approveSale(
                parseInt(tokenId), 
                buyer, 
                newOwnerName, 
                newMetadataCID
            );
            console.log("Transaction sent:", tx);
            await tx.wait();
            console.log("Transaction confirmed!");
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
            <button onClick={checkSaleStatus}>Check Sale Status</button>
            {saleStatus && <p>{saleStatus}</p>}
            {saleBuyer && <p>Buyer: {saleBuyer}</p>}

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
            <button onClick={approveSale}>Approve Sale</button>
        </div>
    );
};

export default ApproveSale;