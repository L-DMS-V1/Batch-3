import axios from 'axios';

const API_URL = '/api/feedback/';

export const getAllFeedback = () => {
    return axios.get(API_URL);
};

export const createFeedback = (feedback) => {
    return axios.post(API_URL, feedback);
};

export const updateFeedback = (id, feedback) => {
    return axios.put(`${API_URL}${id}`, feedback);
};

export const deleteFeedback = (id) => {
    return axios.delete(`${API_URL}${id}`);
};