import {
  GET_USERS_ORDER_FAILURE,
  GET_USERS_ORDER_REQUEST,
  GET_USERS_ORDER_SUCCESS,
} from "./ActionType";

const intialState = {
  loading: false,
  orders: [],
  error: null,
};
export const orderReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_ORDER_SUCCESS:
      return { ...state, loading: false, orders: payload };

    case GET_USERS_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USERS_ORDER_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
