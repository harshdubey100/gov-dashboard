import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MintLand from "./pages/MintLand";
import ApproveSale from "./pages/ApproveSale";
import "./styles.css";
import LandDetails from "./pages/LandDetails";
import UploadLandDocument from "./pages/UploadLandDocument";
import CreateMetadata from "./pages/CreateMetadata";

const App = () => {
    return (
        <Router>
          <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mint" element={<MintLand />} />
                <Route path="/approve" element={<ApproveSale />} />
                <Route path="/LandDetails" element={<LandDetails />} />
                <Route path="/UploadLandDocument" element={<UploadLandDocument />} />
                <Route path="/CreateMetadata" element={<CreateMetadata />} />
            </Routes>
        </Router>
    );
};

export default App;
