import { ON_GET_USERS_SUCCESS, ON_GET_USERS_START,
    ON_REFRESH_USERS_START, ON_REFRESH_USERS_SUCCESS,
    ON_ALL_USERS_LOADED, ON_ADD_NEW_USER, ON_UPDATE_USERS } from "../actions/userActions";

const limit = 15;
const initialState = {
    users: [],
    skip: 0,
    limit: limit,
    loadingData: false,
    allUsersLoaded: false,
    loading: false,
    error: false,
    isRefreshing: false,
    addUserLoading: false
};

const users = (state = initialState, action = {}) => {
    switch (action.type) {
        case ON_GET_USERS_SUCCESS:
            return {
                ...state,
                users: [...state.users, ...action.data],
                skip: state.skip + action.data.length,
                loadingData: false
            };
        case ON_GET_USERS_START:
            return {
                ...state,
                loadingData: true
            };
        case ON_ADD_NEW_USER:
            return {
                ...state,
                users: [...state.users, action.data]
            };
        case ON_UPDATE_USERS:
            return {
                ...state,
                users: action.data
            };
        case ON_ALL_USERS_LOADED:
            return {
                ...state,
                allUsersLoaded: true,
                loadingData: false
            };
        case ON_REFRESH_USERS_START:
            return {
                ...state,
                isRefreshing: true
            };
        case ON_REFRESH_USERS_SUCCESS:
            return {
                ...state,
                users: action.data,
                skip: 0,
                isRefreshing: false,
                allUsersLoaded: false
            };
        default:
            return state
    }
};

export default {
    users
}