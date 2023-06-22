import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllSetsPage } from "../sets/AllSetsPage";
import { OwnedSetsPage } from "../sets/OwnedSetsPage";
import { HomePage } from "../home/HomePage";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { SetView } from "../sets/SetViews";
import { LegoSetForm } from "../sets/NewSetForm";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sets" element={<AllSetsPage />} />
            <Route path="/owned-sets" element={<OwnedSetsPage />} />
            <Route path="/set/:id" element={<SetView />} />
            <Route path="/set/create" element={<LegoSetForm />} />
        </Routes>
    );
};
