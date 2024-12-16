import * as ActionType from "./ActionType";
const intialState = {
  menuItem: [],
  loading: false,
  search: [],
  message: null,
  error: null,
};

export const menuReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionType.CREATE_MENU_ITEM_REQUEST:
    case ActionType.GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST:
    case ActionType.SEARCH_MENU_ITEM_REQUEST:
    case ActionType.DELETE_MENU_ITEM_REQUEST:
    case ActionType.UPDATE_MENU_ITEM_AVALIBLITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case ActionType.CREATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItem: [...state.menuItem, action.payload],
        loading: false,

        message: "food create successfully",
      };
    case ActionType.GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        menuItem: action.payload,
        loading: false,
      };
    case ActionType.SEARCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        search: action.payload,
        loading: false,
      };
    case ActionType.DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItem: state.menuItem.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case ActionType.UPDATE_MENU_ITEM_AVALIBLITY_SUCCESS:
      return {
        ...state,
        menuItem: state.menuItem.map((item) =>
          item._id === action.payload.id ? action.payload : item
        ),
        loading: false,
      };
    case ActionType.CREATE_MENU_ITEM_FAILURE:
    case ActionType.GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE:
    case ActionType.SEARCH_MENU_ITEM_FAILURE:
    case ActionType.DELETE_MENU_ITEM_FAILURE:
    case ActionType.UPDATE_MENU_ITEM_AVALIBLITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};
