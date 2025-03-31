import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="gov-dashboard-container">
            <h1>Government Dashboard</h1>
            <p className="gov-subtext">
                Manage land records, verify ownership, and ensure secure digital transactions.
            </p>

            <div className="gov-card">
                <h2>Steps to Use the Portal</h2>

                <div className="gov-section">
                    <h3>For Land NFT Creation</h3>
                    <ol>
                        <li>
                            <strong>Upload Land Documents:</strong> Use the <strong>Upload Land Document</strong> button to upload the owner's land documents to IPFS and receive the document CID.
                        </li>
                        <li>
                            <strong>Create Metadata:</strong> Click <strong>Create Metadata</strong> to generate metadata, send it to IPFS, and obtain its CID.
                        </li>
                        <li>
                            <strong>Mint the NFT:</strong> Use the <strong>Mint Land</strong> button to mint the land NFT to the owner's address.
                        </li>
                    </ol>
                </div>

                <div className="gov-section">
                    <h3>For Sale Approval</h3>
                    <ol>
                        <li>
                            <strong>User's Step:</strong> The landowner initiates a sale request to transfer ownership.
                        </li>
                        <li>
                            <strong>Your Steps:</strong>
                            <ul>
                                <li>Verify the buyer’s address and collect new owner’s land documents.</li>
                                <li>Follow <strong>Steps 1 & 2</strong> from the Land NFT creation process.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Approve Sale:</strong> Approve the sale request and verify completion using the <strong>Land Details</strong> button.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
