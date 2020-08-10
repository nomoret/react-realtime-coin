import { combineReducers } from "redux";
import { currenciesReducer } from "./currencies";

export const rootReducer = combineReducers({
  currencies: currenciesReducer,
});
