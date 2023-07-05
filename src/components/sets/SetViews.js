import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./sets.css";

export const SetView = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [set, setSet] = useState(null);
    const [theme, setTheme] = useState("");
    const [themes, setThemes] = useState([]);

    const fetchSet = async () => {
        const response = await fetch(`http://localhost:8088/LegoSets/${id}`);
        const setArr = await response.json();
        setSet(setArr);
    };

    useEffect(() => {
        fetchSet();
    }, [id]);

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await fetch("http://localhost:8088/LegoSetThemes");
            const data = await response.json();
            setThemes(data);
        };

        fetchThemes();
    }, []);

    useEffect(() => {
        if (themes.length > 0 && set) {
            const selectedTheme = themes.find((theme) => theme.id === set.themeId);
            setTheme(selectedTheme ? selectedTheme.theme : "");
        }
    }, [themes, set]);

    const deleteButton = () => {
        fetch(`http://localhost:8088/LegoSets/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate("/sets"); // Navigate back to the "/sets" page
            });
    };

    if (!set || themes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div id="set-view">
            <h2>Set Details</h2>
            <img src={set.imgUrl} alt={set.name} class="set-view-image" />
            <div>Name: {set.name}</div>
            <div>Piece Count: {set.piecesCount}</div>
            <div>Theme: {theme}</div>
            <button onClick={() => navigate(`/set/edit/${id}`)}>Edit set details</button>
            <button onClick={deleteButton}>Delete</button>
        </div>
    );
};
