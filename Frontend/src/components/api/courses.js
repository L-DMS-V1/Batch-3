import axios from 'axios';

const API_URL = '/api/courses/';

export const getAllCourses = () => {
    return axios.get(API_URL);
};

export const createCourse = (course) => {
    return axios.post(API_URL, course);
};

export const updateCourse = (id, course) => {
    return axios.put(`${API_URL}${id}`, course);
};

export const deleteCourse = (id) => {
    return axios.delete(`${API_URL}${id}`);
};