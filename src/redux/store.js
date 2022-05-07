import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import tablesReducer from "./tablesReducer";
import initialState from "./initialState";
import thunk from "redux-thunk";

const subreducers = {
  tables: tablesReducer,
}

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose (
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )  
)

export default store;