import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllSetsPage } from "../sets/AllSetsPage";
import { HomePage } from "../home/HomePage";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { SetView } from "../sets/SetViews";
import { LegoSetForm } from "../sets/NewSetForm";
import { SetEdit } from "../sets/EditSets";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sets" element={<AllSetsPage />} />
            <Route path="/set/:id" element={<SetView />} />
            <Route path="/set/create" element={<LegoSetForm />} />
            <Route path="/set/edit/:id" element={<SetEdit />} />
        </Routes>
    );
};
