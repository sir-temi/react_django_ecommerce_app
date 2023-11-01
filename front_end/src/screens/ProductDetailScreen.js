import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
} from "react-bootstrap";
import { detailProduct } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductDetailScreen({ match, history }) {
	// history cmes by default you can use
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetailsState);
	const { error, loading, product } = productDetails;

	// useEffect is a function that runs when the screen is opened
	useEffect(() => {
		dispatch(detailProduct(match.params.id));
	}, [dispatch, match.params.id]);

	// this helps to link to url with the Link component
	const addToCartButton = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger" children={error} />
			) : (
				<div>
					<Link to="/" className="btn btn-primary mb-2">
						GO BACK TO SHOP
					</Link>
					<Row>
						<Col md={6}>
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
						</Col>
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									<h4>{product.name}</h4>
								</ListGroup.Item>

								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
										color="orange"
									/>
								</ListGroup.Item>

								<ListGroup.Item>
									<h4>&#163;{product.price}</h4>
								</ListGroup.Item>

								<ListGroup.Item>
									{product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>{product.price}</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? (
												<span
													style={{ color: "green" }}
												>
													In Stock
												</span>
											) : (
												<span style={{ color: "red" }}>
													Out of Stock
												</span>
											)}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												>
													{[
														...Array(
															product.countInStock
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
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartButton}
										className="btn-block"
										type="button"
										disabled={product.countInStock === 0}
									>
										ADD TO CART
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</div>
			)}
		</div>
	);
}

export default ProductDetailScreen;
