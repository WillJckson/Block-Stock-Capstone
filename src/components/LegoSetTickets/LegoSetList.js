// import React, { useState, useEffect } from "react";

// export const LegoSetList = () => {
//     const [LegoSets, setLegoSets] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:8088/LegoSets")
//             .then((res) => res.json())
//             .then((data) => {
//                 setLegoSets(data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching Lego sets:", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>Lego Sets</h2>
//             {LegoSets.length === 0 ? (
//                 <p>Loading Lego sets...</p>
//             ) : (
//                 <ul>
//                     {LegoSets.map((LegoSet) => (
//                         <li key={LegoSet.id}>
//                             <h3>{LegoSet.name}</h3>
//                             <p>Serial Number: {LegoSet.serialNumber}</p>
//                             <p>Pieces Count: {LegoSet.piecesCount}</p>
//                             <p>Theme: {LegoSet.themeId}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import "./LegoSetList.css"

// export const LegoSetList = () => {
//     const [LegoSets, setLegoSets] = useState([])
//     const [filteredLegoSets, setFiltered] = useState([])
//     const [owned, setOwned] = useState(false)
//     const [openOnly, updateOpenOnly] = useState(false)
//     const navigate = useNavigate()


//     const localLegoUser = localStorage.getItem("lego_user")
//     const legoUserObject = JSON.parse(localLegoUser)

//     useEffect(
//         () => {
//             if (owned) {
//                 const ownedLegoSets = LegoSets.filter(LegoSet => LegoSet.owned === true)
//                 setFiltered(ownedLegoSets)
//             }
//             else {
//                 setFiltered(LegoSets)
//             }
//         },
//         [owned]
//     )
//     useEffect(
//         () => {
//             fetch(`http://localhost:8088/LegoSets`)
//                 .then(response => response.json())
//                 .then((LegoSetArray) => {
//                     setLegoSets(LegoSetArray)
//                 }) // View the initial state of LegoSets
//         },
//         [] // When this array is empty, you are observing initial component state
//     )

//     useEffect(
//         () => {
//             if (legoUserObject.staff) {
//                 setFiltered(LegoSets)
//             }
//             else {
//                 const myLegoSets = LegoSets.filter(LegoSet => LegoSet.userId === legoUserObject.id)
//                 setFiltered(myLegoSets)
//             }
//         },
//         [LegoSets]
//     )

//     useEffect(
//         () => {
//             if (openOnly) {

//                 const openLegoSetArray = LegoSets.filter(LegoSet => {
//                     return LegoSet.userId === legoUserObject.id && LegoSet.dateCompleted === ""
//                 })
//                 setFiltered(openLegoSetArray)
//             }
//             else {
//                 const myLegoSets = LegoSets.filter(LegoSet => LegoSet.userId === legoUserObject.id)
//                 setFiltered(myLegoSets)
//             }
//         },
//         [ openOnly ]
//     )



//     return <>
//         {
//             legoUserObject.staff
//                 ? <>
//                     <button onClick={() => { setOwned(true) }} >My Sets</button>
//                     <button onClick={() => { setOwned(false) }} >All Sets</button>
//                 </>
//                     :<>
//                     <button onClick={() => navigate("/LegoSet/create")}>Create Set</button>
//                     <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
//                     <button onClick={() => updateOpenOnly(false)}>All sets</button>
//                     </>
//         }
//         <h2>List of LegoSets</h2>
//         <article className="LegoSets">
//             {
//                 filteredLegoSets.map(
//                     (LegoSet) => {
//                         return <section className="LegoSet" key={`LegoSet--${LegoSet.id}`}>
//                             <header>{LegoSet.name}</header>
//                             <footer>owned: {LegoSet.owned ? "*" : "No"}</footer>
//                         </section>
//                     }
//                 )
//             }
//         </article>

//     </>
// }