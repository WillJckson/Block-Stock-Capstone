import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllSetsPage } from "../sets/AllSetsPage";
import { OwnedSetsPage } from "../sets/OwnedSetsPage";
import { HomePage } from "../home/HomePage";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sets" element={<AllSetsPage />} />
            <Route path="/owned-sets" element={<OwnedSetsPage />} />
        </Routes>
    );
};
