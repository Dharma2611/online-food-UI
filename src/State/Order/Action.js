import { api } from "../../commponent/config/api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USER_NOTIFICATION_FAILURE,
  GET_USER_NOTIFICATION_REQUEST,
  GET_USER_NOTIFICATION_SUCCESS,
  GET_USERS_ORDER_FAILURE,
  GET_USERS_ORDER_REQUEST,
  GET_USERS_ORDER_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post(`/api/order`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

      console.log("create Order data", data);
    } catch (error) {
      console.log("create Order error", error);
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    }
  };
};
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDER_REQUEST });
    try {
      const { data } = await api.get("/api/order/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("user order", data);
      dispatch({ type: GET_USERS_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("users orders errror", error);
      dispatch({ type: GET_USERS_ORDER_FAILURE, payload: error });
    }
  };
};

// export const getUserNotificationAction = () => {
//   return async (dispatch) => {
//     dispatch({ type: GET_USER_NOTIFICATION_REQUEST });
//     try {
//       const { data } = await api.get("/api/notification");
//       console.log("notification data", data);
//       dispatch({ type: GET_USER_NOTIFICATION_SUCCESS, data });
//     } catch (error) {
//       console.log("notification error", error);
//       dispatch({ type: GET_USER_NOTIFICATION_FAILURE, error });
//     }
//   };
// };
