// Remove unused import
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("sthrasher@cornell.edu");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then((res) => res.json())
            .then((foundUsers) => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0];
                    localStorage.setItem(
                        "lego_user",
                        JSON.stringify({
                            id: user.id,
                            staff: user.isStaff,
                        })
                    );

                    navigate("/"); // Redirect to home page after successful login
                } else {
                    window.alert("Invalid login");
                }
            });
    };

    return (
        <main className="container--login">
            <section>
                {/* Login Form */}
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Welcome to Block Stock</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset>
                        <button type="submit">Sign in</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                {/* Registration Link */}
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    );
};





// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
// import { HomePage } from "../home/HomePage";

// export const Login = () => {
//     const [email, setEmail] = useState("kzarbock9@psu.edu");
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         return (`http://localhost:8088/users?email=${email}`)
//             .then((res) => res.json())
//             .then((foundUsers) => {
//                 if (foundUsers.length === 1) {
//                     const user = foundUsers[0];
//                     localStorage.setItem(
//                         "lego_user",
//                         JSON.stringify({
//                             id: user.id,
//                             staff: user.isStaff,
//                         })
//                     );

//                     navigate("/");
//                 } else {
//                     window.alert("Invalid login");
//                 }
//             });
//     };

//     return (
//         <main className="container--login">
//             <section>
//                 {/* Login Form */}
//                 <form className="form--login" onSubmit={handleLogin}>
//                     <h1>Welcome to Block Stock</h1>
//                     <h2>Please sign in</h2>
//                     <fieldset>
//                         <label htmlFor="inputEmail">Email address</label>
//                         <input
//                             type="email"
//                             value={email}
//                             onChange={(evt) => setEmail(evt.target.value)}
//                             className="form-control"
//                             placeholder="Email address"
//                             required
//                             autoFocus
//                         />
//                     </fieldset>
//                     <fieldset>
//                         <button type="submit">Sign in</button>
//                     </fieldset>
//                 </form>
//             </section>
//             <section className="link--register">
//                 {/* Registration Link */}
//                 <Link to="/register">Not a member yet?</Link>
//             </section>
//         </main>
//     );
// };

// // import React, { useState } from "react"
// // import { Link } from "react-router-dom";
// // import { useNavigate } from "react-router-dom"
// // import "./Login.css"

// // export const Login = () => {
// //     const [email, set] = useState("kzarbock9@psu.edu")
// //     const navigate = useNavigate()

// //     const handleLogin = (e) => {
// //         e.preventDefault()

// //         return (`http://localhost:8088/users?email=${email}`)
// //             .then(res => res.json())
// //             .then(foundUsers => {
// //                 if (foundUsers.length === 1) {
// //                     const user = foundUsers[0]
// //                     localStorage.setItem("lego_user", JSON.stringify({
// //                         id: user.id,
// //                         staff: user.isStaff
// //                     }))

// //                     navigate("/")
// //                 }
// //                 else {
// //                     window.alert("Invalid login")
// //                 }
// //             })
// //     }

// //     return (
// //         <main className="container--login">
// //             <section>
// //                 <form className="form--login" onSubmit={handleLogin}>
// //                     <h1>Welcome to Block Stock</h1>
// //                     <h2>Please sign in</h2>
// //                     <fieldset>
// //                         <label htmlFor="inputEmail"> Email address </label>
// //                         <input type="email"
// //                             value={email}
// //                             onChange={evt => set(evt.target.value)}
// //                             className="form-control"
// //                             placeholder="Email address"
// //                             required autoFocus />
// //                     </fieldset>
// //                     <fieldset>
// //                         <button type="submit">
// //                             Sign in
// //                         </button>
// //                     </fieldset>
// //                 </form>
// //             </section>
// //             <section className="link--register">
// //                 <Link to="/register">Not a member yet?</Link>
// //             </section>
// //         </main>
// //     )
// // }

