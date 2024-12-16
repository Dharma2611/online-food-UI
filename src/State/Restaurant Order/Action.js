import {
  GET_RESTAURANT_ORDER_FAILURE,
  GET_RESTAURANT_ORDER_REQUEST,
  GET_RESTAURANT_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";
import api from "../../commponent/config/api";

export const updateRestaurantStatus = ({ orderId, orderstatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
      const response = await api.put(
        `/api/admin/orders/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const updateOrder = response.data;
      console.log("update order", updateOrder);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updateOrder });
    } catch {
      console.log(error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE });
    }
  };
};

export const fatchRestaurantOrder = ({ restaurantId, orderstatus, jwt }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RESTAURANT_ORDER_REQUEST });
      const response = await api.get(`/api/admin/order/${restaurantId}`, {
        params: { order_status: orderstatus },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const order = response.data;
      console.log("order", order);
      dispatch({ type: GET_RESTAURANT_ORDER_SUCCESS, payload: order });
    } catch {
      console.log(error);
      dispatch({ type: GET_RESTAURANT_ORDER_FAILURE });
    }
  };
};
