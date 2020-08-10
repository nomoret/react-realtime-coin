import { all, fork } from "redux-saga/effects";
import currencies from "./currencies";

export const rootSaga = function* root() {
  yield all([fork(currencies)]);
};
