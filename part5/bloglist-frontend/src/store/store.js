import {createStore, combineReducers, applyMiddleware} from "redux";
import blogsReducer from "../reducers/blogsReducer";
import loggedInUseReducer from "../reducers/loggedInUserReducer";
import notificationTextReducer from "../reducers/notificationTextReducer";
import thunk from "redux-thunk";


const combinedReducer = combineReducers({
   blogs:blogsReducer,
   loggedInUser:loggedInUseReducer,
   notificationText:notificationTextReducer
});

const store = createStore(combinedReducer, applyMiddleware(thunk));

export default store;