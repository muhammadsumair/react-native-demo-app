export const ON_GET_USERS_SUCCESS = 'ON_GET_USERS_SUCCESS';
export const ON_GET_USERS_START = 'ON_GET_USERS_START';
export const ON_GET_USERS_FAILURE = 'ON_GET_USERS_FAILURE';
export const ON_REFRESH_USERS_START = 'ON_REFRESH_USERS_START';
export const ON_REFRESH_USERS_SUCCESS = 'ON_REFRESH_USERS_SUCCESS';
export const ON_ALL_USERS_LOADED = 'ON_ALL_USERS_LOADED';
export const ON_ADD_NEW_USER = 'ON_ADD_NEW_USER';
export const ON_UPDATE_USERS = 'ON_UPDATE_USERS';

import AppService from '../services/AppService';

export function getUserStart() {
    return {
        type: ON_GET_USERS_START
    }
}

export function addNewUser(data) {
    return {
        type: ON_ADD_NEW_USER,
        data
    }
}

export function updateUser(index, data) {
    return (dispatch, getState) => {
        let users = getState().users.users.slice();
        users[index] = data;
        dispatch({
            type: ON_UPDATE_USERS,
            data: users
        })
    }
}

export function onAllUsersLoaded() {
    return {
        type: ON_ALL_USERS_LOADED
    }
}

export function getUserSuccess(data) {
    return {
        type: ON_GET_USERS_SUCCESS,
        data
    }
}

export function refreshUserStart() {
    return {
        type: ON_REFRESH_USERS_START
    }
}

export function refreshUserSuccess(data) {
    return {
        type: ON_REFRESH_USERS_SUCCESS,
        data
    }
}

export function getEmployeeFailure() {
    return {
        type: ON_GET_USERS_FAILURE
    }
}

export function getUsers() {
    return (dispatch, getState) => {
        if(!getState().users.allUsersLoaded) {
            dispatch(getUserStart());
            let skip = getState().users.skip;
            let limit = getState().users.limit;
            AppService.getUsers(skip, limit)
                .then((response) => {
                    if(response.data.length) dispatch(getUserSuccess(response.data));
                    if(response.data.length < getState().users.limit) {
                        dispatch(onAllUsersLoaded());
                    }
                })
                .catch((err) =>  {
                    console.log('err.response: ', err.response);
                })
        }
    }
}

export function refreshUsers() {
    return (dispatch, getState) => {
        dispatch(refreshUserStart());
        let limit = getState().users.limit;
        AppService.getUsers(0, limit)
            .then((response) => {
                dispatch(refreshUserSuccess(response.data));
            })
            .catch((err) =>  {
                console.log('err.response: ', err.response);
            })
    }
}