import { combineReducers } from 'redux';
import auth from './authReducer';
import employees from './employeeReducer';
import users from './userReducer';

const RootReducer = {
    ...auth,
    ...employees,
    ...users
};

export default RootReducer;