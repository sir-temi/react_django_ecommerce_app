import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ThemeProvider } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";

function Dashboard({ history }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState("");
	const [username, setUsername] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.userDetailsState);
	const { error, loading, userLoggedInDetails } = user;

	const userLogged = useSelector((state) => state.userLoginState);
	const { userDetails } = userLogged;

	useEffect(() => {
		// note that when a page loads, the useselector checks the state if
		// there is an object first or else they are empty
		if (userDetails) {
			if (!userLoggedInDetails) {
				dispatch(getUserDetails());
			} else {
				setName(userLoggedInDetails.name);
				setEmail(userLoggedInDetails.email);
				setIsAdmin(userLoggedInDetails.isAdmin);
				setUsername(userLoggedInDetails.username);
			}
		} else {
			history.push("/login");
		}
	}, [dispatch, userDetails, history, userLoggedInDetails]);
	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger" children={error} />
			) : (
				<Row>
					<Col md={5}>
						<h3>Profile</h3>
						<h5>{name}</h5>
						<h5>{username}</h5>
						<h5>{email}</h5>
						<h5>{isAdmin ? "Admin" : ""}</h5>
					</Col>
					<Col md={7}>
						<h3>My Orders</h3>
					</Col>
				</Row>
			)}
		</div>
	);
}

export default Dashboard;
