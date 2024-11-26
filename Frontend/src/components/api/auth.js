import axios from 'axios';

const API_URL = '/api/auth/';

export const login = (username, password) => {
    return axios.post(API_URL + 'signin', { username, password });
};

export const signup = (username, email, password, role) => {
    return axios.post(API_URL + 'signup', { username, email, password, role });
};