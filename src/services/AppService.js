import axios from 'axios';


const BASE_URL = 'https://backbone-practice.herokuapp.com/';

// Add a request interceptor
let axiosInstance = axios.create({
    baseURL: `${BASE_URL}`
});

const Api = {
    login: function(email, password) {
        return axiosInstance.post('/login', {email, password});
    },
    getUsers: function(skip, limit) {
        return axiosInstance.get(`/users/all/${skip}/${limit}`);
    },
    getUser: function(id) {
        return axiosInstance.get(`/users/${id}`);
    },
    addUser: function(user) {
        return axiosInstance.post(`/users/add`, user);
    },
    updateUser: function(email, user) {
        return axiosInstance.post(`/users/add/${email}`, user);
    },
    getEmployees: function(skip, limit) {
        return axiosInstance.get(`/employees/all/${skip}/${limit}`);
    },
    getEmployee: function(id) {
        return axiosInstance.get(`/employees/${id}`);
    }
};

export default Api;