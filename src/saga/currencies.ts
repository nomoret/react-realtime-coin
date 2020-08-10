import { all, fork, call } from "redux-saga/effects";

function* read() {
  while (true) {
    yield console.log("response");
  }
}

function* connect() {
  while (true) {
    yield console.log("start");

    yield call(read);
  }
}

export default function* cuurenciesSaga() {
  yield all([fork(connect)]);
}
