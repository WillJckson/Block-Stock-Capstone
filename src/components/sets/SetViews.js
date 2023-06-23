import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";

export const SetView = () => {

    const navigate = useNavigate()
    // Retrieve the 'id' parameter from the URL
    const { id } = useParams();

    // State variables to store the set, theme, and themes list
    const [set, setSet] = useState(null);
    const [theme, setTheme] = useState(null);
    const [themes, setThemes] = useState([]);

    const fetchSet = async () => {
        fetch(`http://localhost:8088/LegoSets/${id}`)
            .then(response => response.json())
            .then((setArr) => {
                setSet(setArr)
            })
    }
    useEffect(() => {

        // Function to fetch the themes list
        const fetchThemes = async () => {
            try {
                const response = await fetch("http://localhost:8088/LegoSetThemes");
                if (response.ok) {
                    const data = await response.json();
                    setThemes(data);
                } else {
                    throw new Error("Failed to fetch themes");
                }
            } catch (error) {
            }
        };

        // Fetch the set and themes when the 'id' parameter changes
        fetchSet();
        fetchThemes();
    }, [id]);

    const deleteButton = () => {
        fetch(`http://localhost:8088/LegoSets/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate("/sets"); // Navigate back to the "/sets" page
            })
    };

    useEffect(() => {
        // Update the theme when the 'themes' or 'set' state changes
        if (themes.length > 0 && set) {
            const selectedTheme = themes.find((theme) => theme.id === set.themeId);
            setTheme(selectedTheme ? selectedTheme.theme : "");
        }
    }, [themes, set]);

    if (!set || themes.length === 0) {
        // Display a loading message while the data is being fetched
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>Set Details</h2>
            <Link to={`/set/edit/${set.id}`}>Name: {set.name}</Link>
            <div>Piece Count: {set.piecesCount}</div>
            <div>Theme: {theme}</div>
            <button onClick={() => deleteButton(set.id)}>Delete</button>
        </div>
    );
};