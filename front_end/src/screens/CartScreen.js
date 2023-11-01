import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	// above gets any parameter after the first, above gives (?qty=)

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cartState);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkOutButton = () => {
		console.log("hi");
		history.push(`/login?redirect=shipping`);
	};
	return (
		<div>
			{cartItems.length < 1 ? (
				<Message variant="warning" children="Your Cart is empty" />
			) : (
				<Row>
					<Col md={8}>
						<h1>Shopping Cart</h1>
						<ListGroup>
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image
												src={item.image}
												fluid
												rounded
											/>
										</Col>

										<Col md={3}>
											<Link
												to={`/product/${item.product}`}
											>
												{item.name}
											</Link>
										</Col>

										<Col md={2}>{item.price}</Col>

										<Col md={3}>
											<Form.Control
												as="select"
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCart(
															item.product,
															Number(
																e.target.value
															)
														)
													)
												}
											>
												{[
													...Array(
														item.countInStock
													).keys(),
												].map((element) => (
													<option
														key={element + 1}
														value={element + 1}
													>
														{element + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={1}>
											<Button
												type="button"
												onClick={() =>
													removeFromCartHandler(
														item.product
													)
												}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>

					<Col md={4}>
						<Card>
							<ListGroup>
								<ListGroup.Item>
									<h3>
										SubTotal of (
										{cartItems.reduce(
											(a, c) => a + c.qty,
											0
										)}
										) items
									</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<h4>
										Total: &#163;
										{cartItems.reduce(
											(a, c) => a + c.price * c.qty,
											0
										)}
									</h4>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button
										type="button"
										className="btn-block"
										onClick={checkOutButton}
									>
										CHECKOUT
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	);
}

export default CartScreen;
