import { api } from "../../commponent/config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
} from "../Restaurant/ActionType";
import {
  CREATE_INGREDIENTS_CATEGORY_FAILURE,
  CREATE_INGREDIENTS_CATEGORY_REQUEST,
  CREATE_INGREDIENTS_CATEGORY_SUCCESS,
  GET_INGREDIENTS_CATEGORY_FAILURE,
  GET_INGREDIENTS_CATEGORY_REQUEST,
  GET_INGREDIENTS_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionType";

export const getIngredientsOfRestaurnats = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_INGREDIENTS_CATEGORY_REQUEST });
      const response = await api.get(`api/admin/ingredient/restaurant/${id}`, {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      });
      const data = response.data;
      dispatch({ type: GET_INGREDIENTS_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_INGREDIENTS_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const createIngredients = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_CATEGORY_REQUEST });
      const response = await api.post(`api/admin/ingredients`, data, {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      });
      console.log("create ingredients ", response.data);
      const data = response.data;
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const createIngredientsCategory = ({ data, jwt }) => {
  console.log("data", data, "jwt", jwt);
  return async (dispatch) => {
    try {
      dispatch({ type: CREATE_INGREDIENTS_CATEGORY_REQUEST });
      const response = await api.post(`api/admin/ingredients/category`, data, {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      });
      console.log("create ingredients category ", response.data);
      const data = response.data;
      dispatch({
        type: CREATE_INGREDIENTS_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: CREATE_INGREDIENTS_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateOfStockIngredients = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `api/admin/ingredients/${id}/stoke`,
        {},
        {
          headers: {
            Authorization: `bearer ${jwt}`,
          },
        }
      );
      const data = response.data;
      dispatch({ type: UPDATE_STOCK, payload: data });
      console.Console("update Stock Ingredients ", data);
    } catch (error) {
      console.log("update Stock error ", error);
    }
  };
};
