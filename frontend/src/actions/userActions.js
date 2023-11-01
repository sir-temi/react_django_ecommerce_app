import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
} from "../constants/UserConstants";

export const userLogin = (username, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/login/",
			{
				username: username,
				password: password,
			},
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem("userDetails", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail ==
					  "No active account found with the given credentials"
						? "Username and password combination not correct"
						: error.response.data.detail
					: error.message,
		});
	}
};

export const userLogout = () => async (dispatch) => {
	localStorage.removeItem("userDetails");
	dispatch({ type: USER_LOGOUT });
};

export const userRegister = (
	first_name,
	last_name,
	email,
	username,
	password
) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/register/",
			{
				first_name: first_name,
				last_name: last_name,
				email: email,
				username: username,
				password: password,
			},
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		localStorage.setItem("userDetails", JSON.stringify(data));

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail ==
					  "No active account found with the given credentials"
						? "Username and password combination not correct"
						: error.response.data.detail
					: error.message,
		});
	}
};

export const getUserDetails = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const {
			userLoginState: { loading, error, userDetails },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userDetails.access}`,
			},
		};

		const { data } = await axios.get("api/user/profile/", config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail ==
					  "No active account found with the given credentials"
						? "Username and password combination not correct"
						: error.response.data.detail
					: error.message,
		});
	}
};
