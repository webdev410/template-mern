import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
export default function Navbar() {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<nav>
			{Auth.loggedIn() ? (
				<div className="d-flex justify-content-between m-2">
					{/* Navbar when logged in */}
					<Link to="/">Home</Link>
					<Link onClick={logout}>Logout</Link>
				</div>
			) : (
				<div className="d-flex justify-content-between m-2">
					{/* Navbar when not logged in */}
					<Link to="/">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Signup</Link>
				</div>
			)}
		</nav>
	);
}
