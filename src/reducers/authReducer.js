import { ON_LOGIN_SUCCESS, ON_LOGIN_FAILURE, ON_LOGIN_START, NOT_FOUND, ON_LOGOUT } from "../actions/authActions";

const initialState = {
    user: {},
    isLoggedIn: false,
    loading: false,
    notFound: false,
    error: false
};

const auth = (state = initialState, action = {}) => {
    switch (action.type) {
        case NOT_FOUND:
            return {
                ...state,
                notFound: true,
                isLoggedIn: false,
                loading: false
            };
        case ON_LOGIN_START:
            return {
                ...state,
                loading: true,
                notFound: false
            };
        case ON_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.data,
                isLoggedIn: true,
                loading: false
            };
        case ON_LOGOUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false,
                loading: false
            };
        case ON_LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loading: false
            };
        default:
            return state
    }
};

export default {
    auth
}