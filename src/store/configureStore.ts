import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "../saga";
import { rootReducer } from "../reducers";

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(applyMiddleware(sagaMiddleware));

const configureStore = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default configureStore;
