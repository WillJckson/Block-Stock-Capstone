import React, { useEffect, useState } from "react";

export const OwnedSetsPage = () => {
    const [ownedSets, setOwnedSets] = useState([]);
    const [allSets, setAllSets] = useState([]);

    useEffect(() => {
        // Fetch user's owned Lego sets from API
        const userId = localStorage.getItem("lego_user");
        fetch(`http://localhost:8088/users/${userId}/ownedSets`)
            .then((response) => response.json())
            .then((data) => setOwnedSets(data));

        // Fetch all Lego sets from API
        fetch("http://localhost:8088/LegoSets")
            .then((response) => response.json())
            .then((data) => setAllSets(data));
    }, []);

    const addToOwnedSets = (setId) => {
        const userId = localStorage.getItem("lego_user");
        const setToAdd = allSets.find((set) => set.id === setId);

        if (setToAdd) {
            fetch(`http://localhost:8088/users/${userId}/ownedSets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(setToAdd),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Add the newly added set to the state
                    setOwnedSets([...ownedSets, data]);
                });
        }
    };

    const removeFromOwnedSets = (setId) => {
        const userId = localStorage.getItem("lego_user");
        fetch(`http://localhost:8088/users/${userId}/ownedSets/${setId}`, {
            method: "DELETE",
        }).then(() => {
            // Remove the set from the state
            const updatedOwnedSets = ownedSets.filter((set) => set.id !== setId);
            setOwnedSets(updatedOwnedSets);
        });
    };

    return (
        <div>
            <h2>My Owned Lego Sets</h2>
            {ownedSets.map((set) => (
                <div key={set.id}>
                    <h3>{set.name}</h3>
                    {/* Display other details of the set */}
                    <button onClick={() => removeFromOwnedSets(set.id)}>
                        Remove from Owned Sets
                    </button>
                </div>
            ))}
            <h2>All Lego Sets</h2>
            {allSets.map((set) => (
                <div key={set.id}>
                    <h3>{set.name}</h3>
                    {/* Display other details of the set */}
                    {!ownedSets.find((ownedSet) => ownedSet.id === set.id) && (
                        <button onClick={() => addToOwnedSets(set.id)}>
                            Add to Owned Sets
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

// import React, { useEffect, useState } from "react";

// export const OwnedSetsPage = () => {
//     const [ownedSets, setOwnedSets] = useState([]);

//     useEffect(() => {
//         // Fetch user's owned Lego sets from API
//         const userId = localStorage.getItem("lego_user");
//         fetch(`http://localhost:8088/owned-sets`)
//             .then((response) => response.json())
//             .then((data) => setOwnedSets(data));
//     }, []);

//     return (
//         <div>
//             <h2>My Owned Lego Sets</h2>
//             {ownedSets.map((set) => (
//                 <div key={set.id}>
//                     <h3>{set.name}</h3>
//                     {/* Display other details of the set */}
//                 </div>
//             ))}
//         </div>
//     );
// };
