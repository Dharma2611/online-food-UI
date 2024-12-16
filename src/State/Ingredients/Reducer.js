import {
  CREATE_INGREDIENTS_CATEGORY_SUCCESS,
  CREATE_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS,
  GET_INGREDIENTS_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionType";

const initilizer = {
  ingredient: [],
  update: null,
  category: [],
};

export const ingredientReducer = (state = initilizer, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, ingredient: action.payload, update: action.payload };
    case GET_INGREDIENTS_CATEGORY_SUCCESS:
      return { ...state, category: action.payload };
    case CREATE_INGREDIENTS_CATEGORY_SUCCESS:
      return { ...state, ingredient: action.payload, update: action.payload };
    case CREATE_INGREDIENTS_SUCCESS:
      return { ...state, ingredient: action.payload, update: action.payload };
    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        ingredient: state.ingredient.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};
