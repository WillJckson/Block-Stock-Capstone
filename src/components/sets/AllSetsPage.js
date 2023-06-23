import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sets.css";

export const AllSetsPage = () => {
    // State to hold the list of Lego sets
    const [sets, setSets] = useState([]);

    // State to determine if only owned sets should be displayed
    const [ownedOnly, setOwnedOnly] = useState(false);

    // Fetch Lego sets from the API when the component mounts
    useEffect(() => {
        fetch("http://localhost:8088/LegoSets") // Make a GET request to the LegoSets API
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => setSets(data)); // Update the sets state with the fetched data
    }, []);

    // Toggle the display between all sets and owned sets only
    const toggleOwnedOnly = () => {
        setOwnedOnly(!ownedOnly);
    };

    // Filter the sets based on the ownedOnly flag
    const filteredSets = ownedOnly ? sets.filter((set) => set.owned) : sets;

    return (
        <>
            <h2>All Lego Sets</h2>
            <article className="LegoSets">
                {filteredSets.map((set) => (
                    <section className="set" key={`set--${set.id}`}>
                        <header>{set.name}</header>
                        <Link to={`/set/${set.id}`}>View Set</Link>
                    </section>
                ))}
            </article>
        </>
    );
};