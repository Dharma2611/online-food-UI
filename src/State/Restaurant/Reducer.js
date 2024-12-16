import * as ActionType from "./ActionType";

const initialState = {
  restaurants: [],
  userRestaurants: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantEvents: [],
  categories: [],
};

export const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ALL_RESTAURANT_REQUEST:
    case ActionType.DELETE_RESTAURANT_REQUEST:
    case ActionType.UPDATE_RESTAURANT_REQUEST:
    case ActionType.GET_RESTAURANT_BY_ID_REQUEST:
    case ActionType.CREATE_CATEGORY_REQUEST:
    case ActionType.GET_RESTAURANTS_CATEGORY_REQUEST:
      // case ActionType.GET_RESTAURANT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
        loading: false,
      };
    case ActionType.GET_ALL_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
      };
    case ActionType.GET_RESTAURANT_BY_USERID_RESTAURANT_SUCCESS:
    case ActionType.UPDATE_RESTAURANT_STATUS_SUCCESS:
    case ActionType.UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        userRestaurants: action.payload,
        loading: false,
      };
    case ActionType.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        restaurants: state.restaurants.filter(
          (item) => item.id !== action.payload
        ),
      };
    case ActionType.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantEvents: [...state.restaurantEvents, action.payload],
      };
    case ActionType.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantEvents: action.payload,
      };
    case ActionType.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((item) => item.id !== action.payload),
        restaurantEvents: state.restaurantEvents.filter(
          (item) => item.id !== item.payload
        ),
      };
    case ActionType.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case ActionType.GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case ActionType.GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };
    case ActionType.CREATE_CATEGORY_FAILURE:
    case ActionType.CREATE_EVENT_FAILURE:
    case ActionType.CREATE_RESTAURANT_FAILURE:
    case ActionType.GET_ALL_RESTAURANT_FAILURE:
    case ActionType.DELETE_RESTAURANT_FAILURE:
    case ActionType.UPDATE_RESTAURANT_FAILURE:
    case ActionType.GET_RESTAURANTS_CATEGORY_FAILURE:
    case ActionType.GET_RESTAURANT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
