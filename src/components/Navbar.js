import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure your logo is in the assets folder
import "../styles.css"; // Import global styles

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Left Side: Logo + Project Name */}
            <div className="navbar-brand">
                <img src={logo} alt="LandLedger Logo" className="navbar-logo" />
                <h1 className="navbar-title">LandLedger</h1>
            </div>

            {/* Right Side: Navigation Links */}
            <ul className="nav-links">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/mint">Mint Land</Link></li>
                <li><Link to="/approve">Approve Sales</Link></li>
                <li><Link to="/LandDetails">Land Details</Link></li>
                <li><Link to="/UploadLandDocument">UploadLandDocument</Link></li>
                <li><Link to="/CreateMetadata">CreateMetadata</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
