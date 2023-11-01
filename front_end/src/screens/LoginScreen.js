import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ThemeProvider } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { userLogin } from "../actions/userActions";

function LoginScreen({ location, history }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const redirect = location.search ? location.search.split("=")[1] : null;

	const dispatch = useDispatch();
	const user = useSelector((state) => state.userLoginState);
	const { error, loading, userDetails } = user;

	useEffect(() => {
		// note that when a page loads, the useselector checks the state if
		// there is an object first or else they are empty
		if (userDetails) {
			history.push(redirect ? redirect : "/");
		}
	}, [dispatch, userDetails, history, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(userLogin(username, password));
	};

	return (
		<FormContainer>
			<h2>Sign In</h2>
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="text">
					<Form.Control
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary" className="btn-block">
					SIGN IN
				</Button>
			</Form>

			<h5 className="my-2">
				Don't have an account?{" "}
				<span className="primary">
					<strong>
						<Link
							to={
								redirect
									? `/register?redirect=${redirect}`
									: "register"
							}
						>
							REGISTER
						</Link>
					</strong>
				</span>
			</h5>
			{error && <Message variant="danger" children={error} />}
		</FormContainer>
	);
}

export default LoginScreen;
