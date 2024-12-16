import { api } from "../../commponent/config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USERID_RESTAURANT_FAILURE,
  GET_RESTAURANT_BY_USERID_RESTAURANT_REQUEST,
  GET_RESTAURANT_BY_USERID_RESTAURANT_SUCCESS,
  GET_RESTAURANT_EVENTS_FAILURE,
  GET_RESTAURANT_EVENTS_REQUEST,
  GET_RESTAURANT_EVENTS_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
      console.log("all Restaurnat data", data);
    } catch (error) {
      dispatch({
        type: GET_ALL_RESTAURANT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("Register error", error);
    }
  };
};

export const getRestaurnatsByIdAction = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      dispatch({
        type: GET_RESTAURANT_BY_ID_SUCCESS,
        payload: data,
      });
      console.log("RestaurnatsByIdAction", data);
    } catch (error) {
      dispatch({
        type: GET_RESTAURANT_BY_ID_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("Register error", error);
    }
  };
};

export const getRestaurnatsByUserIdAction = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USERID_RESTAURANT_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurants/user`, {
        headers: {
          Authorization: `Bearar ${jwt}`,
        },
      });
      dispatch({
        type: GET_RESTAURANT_BY_USERID_RESTAURANT_SUCCESS,
        payload: data,
      });
      console.log("get restaurant by user id", data);
    } catch (error) {
      dispatch({
        type: GET_RESTAURANT_BY_USERID_RESTAURANT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("Register error", error);
    }
  };
};

export const createRestaurantsAction = (reqData) => {
  console.log("token................", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/restaurants/`, reqData.data, {
        headers: {
          Authorization: `Bearar ${reqData.jwt}`,
        },
      });
      dispatch({
        type: CREATE_RESTAURANT_SUCCESS,
        payload: data,
      });
      console.log("create restaurnats  data", data);
    } catch (error) {
      dispatch({
        type: CREATE_RESTAURANT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("Register error", error);
    }
  };
};

export const updateRestaurantsAction = ({
  restaurantId,
  restaurantData,
  jwt,
}) => {
  console.log("token................", restaurantData.token);
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(
        `/api/admin/restaurants/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearar ${jwt}`,
          },
        }
      );
      dispatch({
        type: UPDATE_RESTAURANT_SUCCESS,
        payload: data,
      });
      console.log("update Restaurnats  data", data);
    } catch (error) {
      dispatch({
        type: UPDATE_RESTAURANT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("update error", error);
    }
  };
};

export const deleteRestaurnats = ({ restaurantId, jwt }) => {
  console.log("token................", jwt);
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.delete(
        `/api/admin/restaurants/${restaurantId}`,
        {},
        {
          headers: {
            Authorization: `Bearar ${jwt}`,
          },
        }
      );
      dispatch({
        type: DELETE_RESTAURANT_SUCCESS,
        payload: data,
      });
      console.log("delets  data", data);
    } catch (error) {
      dispatch({
        type: DELETE_RESTAURANT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("update error", error);
    }
  };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
  console.log("token................");
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USERID_RESTAURANT_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearar ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_RESTAURANT_BY_USERID_RESTAURANT_SUCCESS,
        payload: data,
      });
      console.log("status  data", data);
    } catch (error) {
      dispatch({
        type: GET_RESTAURANT_BY_USERID_RESTAURANT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("status error", error);
    }
  };
};

export const createEventsAction = ({ restaurantId, data, jwt }) => {
  console.log("token................", data.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
      const { data } = await api.post(
        `/api/admin/restaurants/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearar ${jwt}`,
          },
        }
      );
      dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: data,
      });
      console.log("update Restaurnats  data", data);
    } catch (error) {
      dispatch({
        type: CREATE_EVENT_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("update error", error);
    }
  };
};

export const getAllEvents = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const { data } = await api.get(`/api/events`, {
        headers: {
          Authorization: `Bearar ${jwt}`,
        },
      });
      dispatch({
        type: GET_ALL_EVENTS_SUCCESS,
        payload: data,
      });
      console.log("get all events", data);
    } catch (error) {
      dispatch({
        type: GET_ALL_EVENTS_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("events error", error);
    }
  };
};

export const deleteEventsAction = (jwt, eventId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
      const { data } = await api.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearar ${jwt}`,
        },
      });
      dispatch({
        type: DELETE_EVENTS_SUCCESS,
        payload: eventId,
      });
      console.log("get all events", data);
    } catch (error) {
      dispatch({
        type: DELETE_EVENTS_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("events error", error);
    }
  };
};

export const getRestaurantsEventsAction = ({ restaurantId, jwt }) => {
  console.log("token................");
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/events/restaurants/${restaurantId}`,
        {},
        {
          headers: {
            Authorization: `Bearar ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_RESTAURANT_EVENTS_SUCCESS,
        payload: data,
      });
      console.log("status  data", data);
    } catch (error) {
      dispatch({
        type: GET_RESTAURANT_EVENTS_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("status error", error);
    }
  };
};

export const createCategoryActions = (reqData, jwt) => {
  console.log("token................", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearar ${jwt}`,
        },
      });
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: data,
      });
      console.log("create category  data", data);
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.log("category error", error);
    }
  };
};

export const getRestaurantsCategoryAction = ({ restaurantId, jwt }) => {
  console.log("Fetching restaurant category with token:", jwt);
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const { data } = await api.get(
        `/api/category/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`, // Include token in headers
          },
        }
      );
      dispatch({
        type: GET_RESTAURANTS_CATEGORY_SUCCESS,
        payload: data,
      });
      console.log("Fetched restaurant category data:", data);
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      dispatch({
        type: GET_RESTAURANTS_CATEGORY_FAILURE,
        payload: errorMessage,
      });
      console.error("Error fetching restaurant category:", errorMessage);
    }
  };
};
