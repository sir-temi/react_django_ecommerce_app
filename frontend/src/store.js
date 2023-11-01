import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
	productListState: productListReducer,
	productDetailsState: productDetailsReducer,
	cartState: cartReducer,
	userLoginState: userLoginReducer,
	userRegisterState: userRegisterReducer,
	userDetailsState: userDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userDetailsFromStorage = localStorage.getItem("userDetails")
	? JSON.parse(localStorage.getItem("userDetails"))
	: null;

const initialState = {
	cartState: { cartItems: cartItemsFromStorage },
	userLoginState: { userDetails: userDetailsFromStorage },
	userRegisterState: { userDetails: userDetailsFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
