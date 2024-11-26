import axios from 'axios';

const API_URL = '/api/progress/';

export const getProgress = (employeeId) => {
    return axios.get(`${API_URL}${employeeId}`);
};