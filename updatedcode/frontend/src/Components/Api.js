// src/Api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL1 = 'http://localhost:8089/api/users';
const API_URL2 = 'http://localhost:8089/api/manager';
const API_URL3 = 'http://localhost:8089/api/admin';
const API_URL4 = 'http://localhost:8089/api/courses';
const API_URL5 = 'http://localhost:8089/api/course-assignments';
const API_URL6 = 'http://localhost:8089/api/employees';
const API_URL7 = 'http://localhost:8089/api/course-progress';
const API_URL8 = 'http://localhost:8089/api/assessments';
const API_URL9 = 'http://localhost:8089/api/feedbacks';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL1}/signup`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL1}/login`, { username, password });

    if (response.data) {
      console.log("Login Response Data:", response.data);

      // Assuming response.data contains the JWT token
      const token = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);
      console.log("JWT Token stored in localStorage:", token);

      // Decode token to extract role
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken.role) {
        localStorage.setItem('role', decodedToken.role);
        console.log("Role stored in localStorage:", decodedToken.role);
      } else {
        console.error("Role not found in decoded token.");
      }
    } else {
      console.error("Response does not contain token.");
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};


// Function to retrieve the token from localStorage
export const getAuthToken = () => localStorage.getItem('token');

// Set up Axios instance with interceptor to include the token in request headers
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to get resource based on role
export const getResource = async (role) => {
  const rolePathMap = {
    'ROLE_ADMIN': '/admin',
    'ROLE_MANAGER': '/manager',
    'ROLE_EMPLOYEE': '/employee',
  };
  
  try {
    const path = rolePathMap[role] || '/employee';
    const response = await axiosInstance.get(`${API_URL1}${path}`);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRequests = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL2}/getRequests`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRequest = async (requestData) => {
  try {
    const response = await axiosInstance.post(`${API_URL2}/createRequest`,requestData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Admin related API request handlers
export const getAllRequests = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL3}/getAllRequests`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequestById = async (requestId) => {
  try {
    const response = await axiosInstance.get(`${API_URL3}/getRequest/${requestId}`);
    console.log("Request Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching request:", error);
    throw error;
  }
};

// Accept Request
export const acceptRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`${API_URL3}/acceptRequest/${requestId}`);
    console.log("Accept Request Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw error;
  }
};

// Reject Request
export const rejectRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`${API_URL3}/rejectRequest/${requestId}`);
    console.log("Reject Request Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

export const getAllCourseProgress = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL3}/getAllCourseProgress`);
    console.log("Reject Request Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching all course progress:", error);
    throw error;
  }
};

// Course related API request handlers
export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL4}`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (requestId, formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL4}/${requestId}`,formData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`${API_URL4}/${courseId}`);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editCourse = async (courseId, formData) => {
  try {
    const response = await axiosInstance.put(`${API_URL4}/${courseId}`, formData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

// Course Assignment realated API requests
// For manager
export const getAllEmployees = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL2}/getAllEmployees`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// For admin
export const getAllEmployeesAdmin = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL5}/getAllEmployees`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignCourse = async (formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL5}`,formData);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssignedEmployees = async (courseId) => {
  try {
    const response = await axiosInstance.get(`${API_URL5}/assigned-employees/${courseId}`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeAssignment = async (progressId, courseId) => {
  try {
    const response = await axiosInstance.put(`${API_URL5}/${progressId}/${courseId}`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Employee related API endpoints
export const getAssignments = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL6}/getAssignments`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Progress realted API endpoints
export const getCourseProgress = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL7}/getCourseProgress`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseProgress = async (formData) => {
  try {
    const response = await axiosInstance.put(`${API_URL7}/update`,formData);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Assessment related API endpoints
export const createAssessmet = async (formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL8}/create`,formData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAssessment = async (formData) => {
  try {
    const response = await axiosInstance.put(`${API_URL8}/update`,formData);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllAssessments = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL8}/getAllAssessments`);
    console.log("Response Data\n", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAssessment = async (courseId) => {
  try {
    const response = await axiosInstance.get(`${API_URL8}/getAssessment/${courseId}`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitAssessment = async (forData) => {
  try {
    const response = await axiosInstance.post(`${API_URL8}/submit`, forData);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeAssessments = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL6}/get-employee-assessments`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Feedbacks related API
export const submitFeedback = async (formData) => {
  try {
    const response = await axiosInstance.post(`${API_URL9}/submit`,formData);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFeedbacks = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL9}`);
    console.log("Response Data\n", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
