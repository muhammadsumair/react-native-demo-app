import {getUserStart, getUserSuccess, ON_ALL_USERS_LOADED, onAllUsersLoaded} from "./userActions";

export const ON_GET_EMPLOYEES_SUCCESS = 'ON_GET_EMPLOYEES_SUCCESS';
export const ON_GET_EMPLOYEES_START = 'ON_GET_EMPLOYEES_START';
export const ON_GET_EMPLOYEES_FAILURE = 'ON_GET_EMPLOYEES_FAILURE';
export const ON_REFRESH_EMPLOYEES_START = 'ON_REFRESH_EMPLOYEES_START';
export const ON_REFRESH_EMPLOYEES_SUCCESS = 'ON_REFRESH_EMPLOYEES_SUCCESS';
export const ON_ALL_EMPLOYEES_LOADED = 'ON_ALL_EMPLOYEES_LOADED';
const TestFairy = require('react-native-testfairy');

import AppService from '../services/AppService';

export function getEmployeeStart() {
    return {
        type: ON_GET_EMPLOYEES_START
    }
}

export function onAllEmployeesLoaded() {
    return {
        type: ON_ALL_EMPLOYEES_LOADED
    }
}

export function getEmployeeSuccess(data) {
    return {
        type: ON_GET_EMPLOYEES_SUCCESS,
        data
    }
}

export function refreshEmployeeStart() {
    return {
        type: ON_REFRESH_EMPLOYEES_START
    }
}

export function refreshEmployeeSuccess(data) {
    return {
        type: ON_REFRESH_EMPLOYEES_SUCCESS,
        data
    }
}

export function getEmployeeFailure() {
    return {
        type: ON_GET_EMPLOYEES_FAILURE
    }
}

export function getEmployees() {
    return (dispatch, getState) => {
        TestFairy.log("getEmployees allEmployeesLoaded: ", getState().employees.allEmployeesLoaded);
        if(!getState().employees.allEmployeesLoaded) {
            dispatch(getEmployeeStart());
            let skip = getState().employees.skip;
            let limit = getState().employees.limit;
            TestFairy.log("getEmployees limit: ", limit);
            TestFairy.log("getEmployees skip: ", skip);
            AppService.getEmployees(skip, limit)
                .then((response) => {
                    TestFairy.log("response.data: ", response.data);
                    if(response.data.length) dispatch(getEmployeeSuccess(response.data));
                    if(response.data.length < getState().employees.limit) {
                        dispatch(onAllEmployeesLoaded());
                    }
                })
                .catch((err) =>  {
                    TestFairy.log("err.response: ", err.response);
                    console.log('err.response: ', err.response);
                })
        }
    }
}

export function refreshEmployees() {
    return (dispatch, getState) => {
        dispatch(refreshEmployeeStart());
        let limit = getState().employees.limit;
        AppService.getEmployees(0, limit)
            .then((response) => {
                dispatch(refreshEmployeeSuccess(response.data));
            })
            .catch((err) =>  {
                console.log('err.response: ', err.response);
            })
    }
}