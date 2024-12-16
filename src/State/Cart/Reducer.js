import * as ActionType from "./ActionType";
import { LOGOUT } from "../Authentication/ActionType";

const intialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
};
export const cartReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionType.FIND_CART_REQUEST:
    case ActionType.GET_ALL_CART_ITEMS_REQUEST:
    case ActionType.UPDATE_CART_ITEM_REQUEST:
    case ActionType.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FIND_CART_SUCCESS:
    case ActionType.CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };

    case ActionType.ADD_TO_CART_SUCCESS:
      // console.log("aadasdss cart", ...state.cartItems);
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
        loading: false,
        error: null,
      };
    case ActionType.UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case ActionType.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case ActionType.FIND_CART_FAILURE:
    case ActionType.UPDATE_CART_ITEM_FAILURE:
    case ActionType.REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return {
        ...state,
        cartItems: [],
        cart: null,
        success: "logout success",
      };
    default:
      return state;
  }
};
