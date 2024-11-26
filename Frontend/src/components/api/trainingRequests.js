import axios from 'axios';

const API_URL = '/api/trainingRequests/';

export const getAllTrainingRequests = () => {
    return axios.get(API_URL);
};

export const createTrainingRequest = (request) => {
    return axios.post(API_URL, request);
};

export const updateTrainingRequest = (id, request) => {
    return axios.put(`${API_URL}${id}`, request);
};

export const deleteTrainingRequest = (id) => {
    return axios.delete(`${API_URL}${id}`);
};