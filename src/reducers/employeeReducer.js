import { ON_GET_EMPLOYEES_SUCCESS, ON_GET_EMPLOYEES_START,
    ON_REFRESH_EMPLOYEES_START, ON_REFRESH_EMPLOYEES_SUCCESS, ON_ALL_EMPLOYEES_LOADED } from "../actions/employeeActions";

const limit = 15;
const initialState = {
    employees: [],
    skip: 0,
    limit: limit,
    loadingData: false,
    allEmployeesLoaded: false,
    loading: false,
    error: false,
    isRefreshing: false
};

const employees = (state = initialState, action = {}) => {
    switch (action.type) {
        case ON_GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: [...state.employees, ...action.data],
                skip: state.skip + action.data.length,
                loadingData: false
            };
        case ON_GET_EMPLOYEES_START:
            return {
                ...state,
                loadingData: true
            };
        case ON_ALL_EMPLOYEES_LOADED:
            return {
                ...state,
                allEmployeesLoaded: true,
                loadingData: false
            };
        case ON_REFRESH_EMPLOYEES_START:
            return {
                ...state,
                isRefreshing: true
            };
        case ON_REFRESH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.data,
                skip: 0,
                isRefreshing: false,
                allEmployeesLoaded: false
            };
        default:
            return state
    }
};

export default {
    employees
}