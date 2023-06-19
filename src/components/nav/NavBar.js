import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/home">Home</Link>
            </li>
            <li className="navbar__item">
                <Link to="/sets">Lego Sets</Link>
            </li>  
            {
                localStorage.getItem("lego_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to ="" onClick={() => {
                            localStorage.removeItem("lego_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    );
};
// import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

// export const NavBar = () => {
//     const navigate = useNavigate()

//     return (
//         <ul className="navbar">
//             {/* <li className="navbar__item active">
//                 <Link className="navbar__link" to="/home">home</Link>
//             </li> */}
//             {
//                 localStorage.getItem("lego_user")
//                     ? <li className="navbar__item navbar__logout">
//                         <Link className="navbar__link" to="" onClick={() => {
//                             localStorage.removeItem("lego_user")
//                             navigate("/", {replace: true})
//                         }}>Logout</Link>
//                     </li>
//                     : ""
//             }
//         </ul>
//     )
// }