import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <ul className="navbar">
            <li className={`navbar__item ${isActive("/home")}`}>
                <Link to="/home" className="navbar__link">
                    Home
                </Link>
            </li>
            <li className={`navbar__item ${isActive("/sets")}`}>
                <Link to="/sets" className="navbar__link">
                    Lego Sets
                </Link>
            </li>
            <li className={`navbar__item ${isActive("/set/create")}`}>
                <Link to="/set/create" className="navbar__link">
                    New Set
                </Link>
            </li>
            {localStorage.getItem("lego_user") ? (
                <li className="navbar__item navbar__logout">
                    <Link
                        className="navbar__link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("lego_user");
                            window.location.href = "/"; // Redirect to the root URL
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                <li className={`navbar__item ${isActive("/login")}`}>
                    <Link to="/login" className="navbar__link">
                        Sign In
                    </Link>
                </li>
            )}
        </ul>
    );
};


// import React from "react";
// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import "./NavBar.css";

// export const NavBar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const isActive = (path) => {
//         return location.pathname === path ? "active" : "";
//     };

//     return (
//         <ul className="navbar">
//             <li className={`navbar__item ${isActive("/home")}`}>
//                 <NavLink to="/home" className="navbar__link">
//                     Home
//                 </NavLink>
//             </li>
//             <li className={`navbar__item ${isActive("/sets")}`}>
//                 <NavLink to="/sets" className="navbar__link">
//                     Lego Sets
//                 </NavLink>
//             </li>
//             <li className={`navbar__item ${isActive("/set/create")}`}>
//                 <NavLink to="/set/create" className="navbar__link">
//                     New Set
//                 </NavLink>
//             </li>
//             {localStorage.getItem("lego_user") ? (
//                 <li className="navbar__item navbar__logout">
//                     <Link
//                         className="navbar__link"
//                         to=""
//                         onClick={() => {
//                             localStorage.removeItem("lego_user");
//                             navigate("/", { replace: true });
//                         }}
//                     >
//                         Logout
//                     </Link>
//                 </li>
//             ) : null}
//         </ul>
//     );
// };
