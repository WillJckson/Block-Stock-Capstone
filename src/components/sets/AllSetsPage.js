import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sets.css";

export const AllSetsPage = () => {
    const [sets, setSets] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/LegoSets")
            .then((response) => response.json())
            .then((data) => setSets(data));
    }, []);

    return (
        <>
            <h2>All Lego Sets</h2>
            <article className="LegoSets">
                {sets.map((set) => (
                    <section className="set" key={`set--${set.id}`}>
                        <header>{set.name}</header>
                        <img src={set.imgUrl} alt={set.name} />
                        <Link to={`/set/${set.id}`} className="view-set-link">View Set</Link>
                    </section>
                ))}
            </article>
        </>
    );
};

