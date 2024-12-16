import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import axios from "axios";
import { API_URL } from "../../commponent/config/api";

const setJWT = (token) => {
  if (token) localStorage.setItem("jwt", token);
};

const clearJWT = () => {
  localStorage.removeItem("jwt");
};

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );
    setJWT(data.jwt);
    reqData.navigate(
      data.role === "ROLE_RESTAURANT_OWNER" ? "/admin/restaurant" : "/"
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("Register success", data);
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || error.message,
    });
    console.log("Register error", error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );

    if (data.jwt) {
      setJWT(data.jwt);
      reqData.navigate(
        data.role === "ROLE_RESTAURANT_OWNER" ? "/admin/restaurant" : "/"
      );
      dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
      console.log("Login success", data);
    } else {
      throw new Error("Login successful but no token received");
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data || error.message,
    });
    console.log("Login error", error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  if (!jwt)
    return dispatch({ type: GET_USER_FAILURE, payload: "JWT is required" });

  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("User fetched successfully", data);
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data || error.message,
    });
    console.log("Fetch user error", error);
  }
};

export const addToFavorite = (jwt, restaurantId) => async (dispatch) => {
  if (!jwt) {
    return dispatch({
      type: ADD_TO_FAVORITE_FAILURE,
      payload: "JWT is required",
    });
  }

  // Log the restaurant ID directly
  console.log("Adding restaurant to favorites with ID:", restaurantId);

  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    const { data } = await axios.put(
      `${API_URL}/api/restaurants/${restaurantId}/add-favorites`,
      {}, // Assuming no body is needed for this request
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    console.log("Added to favorite", data);
  } catch (error) {
    dispatch({
      type: ADD_TO_FAVORITE_FAILURE,
      payload: error.response?.data || error.message,
    });
    console.log("Add to favorite error", error);
  }
};

export const logout = () => (dispatch) => {
  clearJWT();
  dispatch({ type: LOGOUT });
  console.log("Logout success");
};
