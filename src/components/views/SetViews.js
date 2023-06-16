import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SetView = () => {
    const { id } = useParams();
    const [set, setSet] = useState(null);

    useEffect(() => {
        const fetchSet = async () => {
            try {
                const response = await fetch(`http://localhost:8088/LegoSets/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setSet(data);
                } else {
                    throw new Error("Failed to fetch set");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSet();
    }, [id]);

    if (!set) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Set Details</h2>
            <div>Name: {set.name}</div>
            <div>Piece Count: {set.pieceCount}</div>
        </div>
    );
};

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export const SetView = () => {
//     const { id } = useParams();
//     const [set, setSet] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:8088/LegoSets`)
//             .then((response) => response.json())
//             .then((data) => {
//                 const singleSet = data.find((item) => item.id === id.toString());
//                 setSet(singleSet);
//             });
//     }, [id]);

//     if (!set) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Set Details</h2>
//             <div>Name: {set.name}</div>
//             <div>Piece Count: {set.pieceCount}</div>
//         </div>
//     );
// };

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export const SetView = () => {
//     const { id } = useParams();
//     const [set, setSet] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:8088/LegoSets`)
//             .then((response) => response.json())
//             .then((data) => {
//                 const singleSet = data.find((item) => item.id === id);
//                 setSet(singleSet);
//             });
//     }, [id]);

//     if (!set) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Set Details</h2>
//             <div>Name: {set.name}</div>
//             <div>Piece Count: {set.pieceCount}</div>
//         </div>
//     );
// };

{/* <div>Theme: {set.theme}</div> */ }