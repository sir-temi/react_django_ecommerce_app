import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Dashboard from "./screens/Dashboard";
function App() {
	return (
		<Router>
			<Header />
			<main>
				<Container>
					<Route path="/" component={HomeScreen} exact />
					<Route
						path="/product/:id"
						component={ProductDetailScreen}
					/>
					{/* adding question mark makes is optional */}
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/dashboard" component={Dashboard} />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
