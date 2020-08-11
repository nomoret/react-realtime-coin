import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "../saga";
import { rootReducer } from "../reducers";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  process.env.NODE_ENV == "production"
    ? compose(applyMiddleware(sagaMiddleware))
    : compose(
        applyMiddleware(sagaMiddleware),
        typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
          ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
          : (f: Function) => {
              console.log(f);
              return f;
            }
      );

const configureStore = createStore(rootReducer, composeEnhancer);
sagaMiddleware.run(rootSaga);

export default configureStore;
