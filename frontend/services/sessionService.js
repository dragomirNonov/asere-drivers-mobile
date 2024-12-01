import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "https://asere-transportation.com";
const BASE_URL = "http://192.168.1.95:3001";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers["token"] = token;
      }
      return config;
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject({
      status: error?.response?.status || 500,
      statusText: error?.response?.statusText || "Error",
      message:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
    });
  }
);

// Session API functions
const createSession = async (sessionObj) => {
  try {
    const response = await apiClient.post("/api/clock-in", sessionObj);
    return response;
  } catch (error) {
    throw error;
  }
};

const endSession = async (sessionObj) => {
  try {
    const response = await apiClient.post("/clock-out", sessionObj);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editSession = async (sessionId, sessionObj) => {
  try {
    const response = await apiClient.put(`/session/${sessionId}`, sessionObj);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSessionsByStudentId = async (studentId) => {
  try {
    const response = await apiClient.get(`/api/sessions/${studentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteSessionById = async (sessionId) => {
  try {
    const response = await apiClient.delete(`/api/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createSession,
  endSession,
  editSession,
  getSessionsByStudentId,
  deleteSessionById,
};
