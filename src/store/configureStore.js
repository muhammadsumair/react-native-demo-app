'use strict';
// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import RootReducer from '../reducers';

const middleware = () => {
    return applyMiddleware(reduxThunk)
};
export default createStore(
    combineReducers({
        ...RootReducer
    }),
    middleware()
)