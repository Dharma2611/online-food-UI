import {
  GET_RESTAURANT_ORDER_FAILURE,
  GET_RESTAURANT_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";

const initilizer = {
  loading: false,
  order: [],
  error: null,
};
export const RestaurantOrderReducer = (state = initilizer, action) => {
  switch (action.type) {
    case GET_RESTAURANT_ORDER_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RESTAURANT_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: null };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return { ...state, loading: false, order: action.payload, error: null };
    case GET_RESTAURANT_ORDER_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
