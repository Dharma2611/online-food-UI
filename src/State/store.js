import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { restaurantsReducer } from "./Restaurant/Reducer";
import { menuReducer } from "./Menu/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";

const rooteReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantsReducer,
  menu: menuReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantOrder: restaurantsReducer,
  ingredients: ingredientReducer,
});
export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));
