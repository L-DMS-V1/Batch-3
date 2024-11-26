import axios from 'axios';

const API_URL = '/api/assignments/';

export const getAllAssignments = () => {
    return axios.get(API_URL);
};

export const createAssignment = (assignment) => {
    return axios.post(API_URL, assignment);
};

export const updateAssignment = (id, assignment) => {
    return axios.put(`${API_URL}${id}`, assignment);
};

export const deleteAssignment = (id) => {
    return axios.delete(`${API_URL}${id}`);
};