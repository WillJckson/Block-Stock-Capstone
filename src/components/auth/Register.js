import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = () => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isStaff: false,
    });
    const navigate = useNavigate();

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        })
            .then((res) => res.json())
            .then((createdUser) => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem(
                        "lego_user",
                        JSON.stringify({
                            id: createdUser.id,
                            staff: createdUser.isStaff,
                        })
                    );

                    navigate("/LegoSets"); // Redirect to LegoSets page after successful registration
                }
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then((res) => res.json())
            .then((response) => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists");
                } else {
                    // Good email, create user.
                    registerNewUser();
                }
            });
    };

    const updateCustomer = (evt) => {
        const copy = { ...customer };
        copy[evt.target.id] = evt.target.value;
        setCustomer(copy);
    };

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">
                    Register an account
                </h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input
                        onChange={updateCustomer}
                        type="text"
                        id="fullName"
                        className="form-control"
                        placeholder="Full name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input
                        onChange={updateCustomer}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    );
};