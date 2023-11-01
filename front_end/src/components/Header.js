import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../actions/userActions";

function Header({ history }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userLoginState);

	const { userDetails } = user;

	const logoutHandler = () => {
		dispatch(userLogout());
	};
	return (
		<header className="mb-4">
			<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>OpenMarket</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto">
							<LinkContainer to="/">
								<Nav.Link>SHOP</Nav.Link>
							</LinkContainer>
						</Nav>
						<Nav>
							{userDetails ? (
								<React.Fragment>
									<LinkContainer to="/dashboard">
										<Nav.Link>
											<i class="fas fa-user"></i>{" "}
											{userDetails.name.split(" ")[0]}
											{userDetails.isAdmin
												? " (ADMIN)"
												: ""}
										</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/cart">
										<Nav.Link>
											<i className="fas fa-shopping-cart"></i>{" "}
											Cart
										</Nav.Link>
									</LinkContainer>
									<Nav.Link onClick={logoutHandler}>
										Log Out
									</Nav.Link>
								</React.Fragment>
							) : (
								<React.Fragment>
									<LinkContainer to="/cart">
										<Nav.Link>
											<i className="fas fa-shopping-cart"></i>{" "}
											Cart
										</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/login">
										<Nav.Link>Login</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/register">
										<Nav.Link>Register</Nav.Link>
									</LinkContainer>
								</React.Fragment>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
