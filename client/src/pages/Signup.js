import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = (props) => {
	useEffect(() => {
		document.title = `${props.title} | React Site`;
	});
	const [formState, setFormState] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});
	const [addUser, { error, data }] = useMutation(ADD_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);

		try {
			const { data } = await addUser({
				variables: { ...formState },
			});

			Auth.login(data.addUser.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className="d-flex justify-content-center mb-4">
			<div className="col-12 col-lg-6">
				<div className="card">
					<h4 className="card-header p-2">Sign Up</h4>
					<div className="card-body justify-content-center">
						{data ? (
							<p>
								Success! You may now head{" "}
								<Link to="/">back to the homepage.</Link>
							</p>
						) : (
							<form onSubmit={handleFormSubmit}>
								<input
									className="form-control m-2"
									placeholder="Full Name"
									name="name"
									type="text"
									value={formState.name}
									onChange={handleChange}
								/>
								<input
									className="form-control m-2"
									placeholder="Username"
									name="username"
									type="text"
									value={formState.username}
									onChange={handleChange}
								/>
								<input
									className="form-control m-2"
									placeholder="Your email"
									name="email"
									type="email"
									value={formState.email}
									onChange={handleChange}
								/>
								<input
									className="form-control m-2"
									placeholder="******"
									name="password"
									type="password"
									value={formState.password}
									onChange={handleChange}
								/>
								<button
									className="btn btn-sm btn-primary m-2"
									style={{ cursor: "pointer" }}
									type="submit"
								>
									Submit
								</button>
							</form>
						)}
						{error && (
							<div className="my-3 p-3 bg-danger text-white">
								{error.message}
							</div>
						)}
						Already a member?
						<Link className="m-1" to="/login">
							Login
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Signup;
