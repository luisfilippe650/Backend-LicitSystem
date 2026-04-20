import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard.jsx";

import ProcurementList from "../pages/procurements/ProcurementList";
import CreateProcurements from "../pages/procurements/CreateProcurements.jsx";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/procurements" element={<ProcurementList />} />
                <Route path="/CreateProcurements" element={<CreateProcurements/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;