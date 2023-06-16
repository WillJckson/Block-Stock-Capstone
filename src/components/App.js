import React from "react";
import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { SetView } from "./views/SetViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AllSetsPage } from "./sets/AllSetsPage";
import "./App.css";

export const App = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/set/:id" element={<SetView />} />
				<Route path="/" element={<AllSetsPage />} />
				<Route
					path="*"
					element={
						<Authorized>
							<ApplicationViews />
						</Authorized>
					}
				/>
			</Routes>
		</>
	);
};


// import { Route, Routes } from "react-router-dom"
// import { Authorized } from "./views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"
// import { SetView } from "./views/SetViews";
// import { NavBar } from "./nav/NavBar"
// import { Login } from "./auth/Login"
// import { Register } from "./auth/Register"
// import "./App.css"


// export const App = () => {
// 	return <Routes>
// 		<Route path="/login" element={<Login />} />
// 		<Route path="/register" element={<Register />} />
// 		<Route path="/set/${set.id}" element={<SetView />}/>

// 		<Route path="*" element={
// 			<Authorized>
// 				<>
// 					<NavBar />
// 					<ApplicationViews />
// 				</>
// 			</Authorized>
// 		} />
// 	</Routes>
// }

