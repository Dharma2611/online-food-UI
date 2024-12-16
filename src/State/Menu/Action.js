import { api } from "../../commponent/config/api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_AVALIBLITY_REQUEST,
  UPDATE_MENU_ITEM_AVALIBLITY_FAILURE,
  UPDATE_MENU_ITEM_AVALIBLITY_SUCCESS,
} from "./ActionType";

const setAuthorizationHeader = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`, // Correctly use Authorization header
  },
});

export const createMenuItem = ({ menu, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST }); // Corrected dispatch usage
    try {
      const { data } = await api.post(
        "/api/admin/food",
        menu,
        setAuthorizationHeader(jwt)
      );
      console.log("create menu", data);
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("error from create menu", error);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const getMenuItemByRestaurantIdAction = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST });
    try {
      // Ensure boolean values are handled correctly
      const vegetarian =
        reqData.Vegetarian !== undefined ? reqData.Vegetarian : false;
      const nonVeg = reqData.NonVeg !== undefined ? reqData.NonVeg : false;
      const seasonal =
        reqData.Seasonal !== undefined ? reqData.Seasonal : false;

      // Build the query string for the request
      let url = `/api/food/restaurant/${reqData.restaurantId}?Vegetarian=${vegetarian}&NonVeg=${nonVeg}&Seasonal=${seasonal}`;

      // Only append food_category if it is provided and not empty
      if (reqData.foodCategory) {
        url += `&food_category=${reqData.foodCategory}`;
      }

      // Log the final URL for debugging purposes
      console.log("Constructed URL:", url);

      // Send the request
      const { data } = await api.get(url, setAuthorizationHeader(reqData.jwt));

      console.log("menu by restaurant ID", data);
      dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("Error in get menu by restaurant ID:", error);
      dispatch({
        type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
        payload:
          error.response?.data?.message || error.message || "An error occurred",
      });
    }
  };
};

export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST }); // Corrected dispatch usage
    try {
      const { data } = await api.get(
        `/api/food/search?name=${keyword}`,
        setAuthorizationHeader(jwt)
      );
      console.log("search results", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("error from search menu", error);
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const updateMenuItem = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_AVALIBLITY_REQUEST }); // Corrected dispatch usage
    try {
      const { data } = await api.put(
        `/api/admin/food/${foodId}`,
        {},
        setAuthorizationHeader(jwt)
      );
      console.log("update", data);
      dispatch({ type: UPDATE_MENU_ITEM_AVALIBLITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error from update menu", error);
      dispatch({ type: UPDATE_MENU_ITEM_AVALIBLITY_FAILURE, payload: error });
    }
  };
};

export const deleteMenuItem = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST }); // Corrected dispatch usage
    try {
      await api.delete(
        `/api/admin/food/${foodId}`,
        setAuthorizationHeader(jwt)
      );
      console.log("deleted menu item with id", foodId);
      dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
    } catch (error) {
      console.log("error from delete menu", error);
      dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};
