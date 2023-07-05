import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./sets.css";

export const SetView = () => {
    const navigate = useNavigate(); // Function for programmatic navigation within the app

    const { id } = useParams(); // Extracts the value of the 'id' parameter from the URL
    
    const [set, setSet] = useState(null); // State variable for the fetched Lego set data, initially set to null
    
    const [theme, setTheme] = useState(""); // State variable for the selected theme, initially set to an empty string
    
    const [themes, setThemes] = useState([]); // State variable for the array of available themes, initially set to an empty array
    
    
    const fetchSet = async () => {
        // Send a GET request to `http://localhost:8088/LegoSets/${id}`
        const response = await fetch(`http://localhost:8088/LegoSets/${id}`);
        // Parse the response data as JSON
        const setArr = await response.json();
        // Set the set state with the fetched data
        setSet(setArr);
    };
    
    useEffect(() => {
        // Call the fetchSet function whenever the `id` dependency changes
        fetchSet();
    }, [id]);
    

    useEffect(() => {
        // Define an async function to fetch themes
        const fetchThemes = async () => {
            // Send a GET request to "http://localhost:8088/LegoSetThemes"
            const response = await fetch("http://localhost:8088/LegoSetThemes");
            // Parse the response data as JSON
            const data = await response.json();
            // Set the themes state with the fetched data
            setThemes(data);
        };
    
        // Call the fetchThemes function when the component mounts (loads for the first time)
        fetchThemes();
    }, []);
    

    useEffect(() => {
        // Check if themes array has at least one element and set is truthy
        if (themes.length > 0 && set) {
            // Find the theme in the themes array that matches the themeId in set
            const selectedTheme = themes.find((theme) => theme.id === set.themeId);
            // Set the theme using the setTheme function if a matching theme is found
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
