import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { companionMiddleware } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.length.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(companionMiddleware, thunk))
);

export default store;