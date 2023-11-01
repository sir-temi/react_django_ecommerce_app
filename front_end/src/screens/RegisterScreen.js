import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ThemeProvider } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { userRegister } from "../actions/userActions";

function RegisterScreen({ location, history }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const [passMessage, setPassMessage] = useState("");
	const [fnameMessage, setfnameMessage] = useState("");
	const [lnameMessage, setlnameMessage] = useState("");
	const [emailMessage, setemailMessage] = useState("");
	const [usernameMessage, setusernameMessage] = useState("");

	const redirect = location.search ? location.search.split("=")[1] : null;

	const dispatch = useDispatch();
	const user = useSelector((state) => state.userRegisterState);
	const { error, loading, userDetails } = user;

	useEffect(() => {
		// note that when a page loads, the useselector checks the state if
		// there is an object first or else they are empty
		if (userDetails) {
			history.push(redirect ? redirect : "/");
		}
	}, [dispatch, userDetails, history, redirect]);

	const objChecker = async (e) => {
		if (e) {
			const { data } = await axios.get(`register/${e}`);
			if (data === "Exists") {
				if (e === email) {
					setemailMessage("This email has been used on here");
				} else {
					setusernameMessage("Choose another username");
				}
			} else {
				if (e === email) {
					setemailMessage("");
				} else {
					setusernameMessage("Nice! Username is available");
				}
			}
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (firstName.length < 2) {
			setfnameMessage("First name is too short");
		} else if (lastName.length < 3) {
			setlnameMessage("Last name is too short");
		} else if (email.length === 0) {
			setemailMessage("Please enter your email");
		} else if (username.length === 0) {
			setusernameMessage("Please choose a username");
		} else if (password.length === 0) {
			setPassMessage("Enter your password");
		} else if (password != password2) {
			setPassMessage("Passwords don't match");
		} else {
			dispatch(
				userRegister(firstName, lastName, email, username, password)
			);
		}
	};

	return (
		<FormContainer>
			{loading ? (
				<Loader />
			) : (
				<div>
					<h2>Register</h2>

					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Row>
								<Col>
									<Form.Control
										placeholder="First name"
										value={firstName}
										onChange={(e) => {
											setFirstName(e.target.value);
										}}
									/>
									<span className="danger">
										{fnameMessage}
									</span>
								</Col>
								<Col>
									<Form.Control
										placeholder="Last name"
										value={lastName}
										onChange={(e) => {
											setLastName(e.target.value);
										}}
									/>
									<span className="danger">
										{lnameMessage}
									</span>
								</Col>
							</Form.Row>
						</Form.Group>
						<Form.Group controlId="email">
							<Form.Control
								type="email"
								placeholder="Email address"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								onBlur={(e) => {
									if (e.target.value.length > 0) {
										objChecker(e.target.value);
									}
								}}
							></Form.Control>
							<span style={{ color: "red" }}>{emailMessage}</span>
						</Form.Group>
						<Form.Group controlId="text">
							<Form.Control
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								onBlur={(e) => {
									if (e.target.value.length > 0) {
										objChecker(e.target.value);
									}
								}}
							></Form.Control>
							{usernameMessage === "Choose another username" ? (
								<span style={{ color: "red" }}>
									{usernameMessage}
								</span>
							) : (
								<span style={{ color: "green" }}>
									{usernameMessage}
								</span>
							)}
						</Form.Group>

						<Form.Group>
							<Form.Row>
								<Col>
									<Form.Control
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									></Form.Control>
								</Col>
								<Col>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										value={password2}
										onChange={(e) => {
											setPassword2(e.target.value);
										}}
									></Form.Control>
								</Col>
							</Form.Row>
							{passMessage}
						</Form.Group>

						<Button
							type="submit"
							variant="primary"
							className="btn-block"
						>
							REGISTER
						</Button>
					</Form>

					<h5 className="my-2">
						Already registered?{" "}
						<span className="primary">
							<strong>
								<Link
									to={
										redirect
											? `/login?redirect=${redirect}`
											: "/login"
									}
								>
									Login
								</Link>
							</strong>
						</span>
					</h5>
					{error && <Message variant="danger" children={error} />}
				</div>
			)}
		</FormContainer>
	);
}

export default RegisterScreen;
