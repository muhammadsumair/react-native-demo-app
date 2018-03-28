export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const ON_LOGIN_FAILURE = 'ON_LOGIN_FAILURE';
export const ON_LOGIN_START = 'ON_LOGIN_START';
export const ON_LOGOUT = 'ON_LOGOUT';
export const NOT_FOUND = 'NOT_FOUND';

import { AsyncStorage } from 'react-native';
import AppService from '../services/AppService';

export function userNotFound() {
    return {
        type: NOT_FOUND
    }
}

export function loginStart() {
    return {
        type: ON_LOGIN_START
    }
}

export function loginSuccess(data) {
    return {
        type: ON_LOGIN_SUCCESS,
        data
    }
}

export function onLogout() {
    return {
        type: ON_LOGOUT
    }
}

export function loginError() {
    return {
        type: ON_LOGIN_FAILURE
    }
}

export function logout() {
    return (dispatch) => {
        AsyncStorage.removeItem('USER');
        dispatch(onLogout());
    }
}

export function login(email, password) {
    return (dispatch) => {
        dispatch(loginStart());
        AppService.login(email, password)
            .then((response) => {
                console.log("response.data.user: ", response.data.user);
                AsyncStorage.setItem('USER', JSON.stringify(response.data.user));
                dispatch(loginSuccess(response.data.user));
            })
            .catch((err) =>  {
                console.log('err.response: ', err.response);
                if(err.response && err.response.status === 404) {
                    dispatch(userNotFound());
                }
            })
    }
}