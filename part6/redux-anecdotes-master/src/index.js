import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {Provider} from "react-redux";
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationsReducer";
import filterReducer from "./reducers/filterReducer";
import thunk from "redux-thunk";


const joinedReducer = combineReducers({
    anecdotes: reducer,
    notification: notificationReducer,
    filterText: filterReducer
});

const store = createStore(joinedReducer, applyMiddleware(thunk));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>
        ,
        document.getElementById('root')
    )
};

render();
store.subscribe(render);