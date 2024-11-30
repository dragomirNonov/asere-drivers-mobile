import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "https://asere-transportation.com";
const BASE_URL = "http://192.168.1.95:3001";

const login = (loginObj) => {
  return axios.post(`${BASE_URL}/api/login`, loginObj);
};

const register = (registerObj) => {
  return axios.post(`${BASE_URL}/api/register`, registerObj);
};

const getUserById = (userId) => {
  return axios.post(`${BASE_URL}/api/user`, { id: userId });
};

const getAllStudents = async () => {
  const token = await AsyncStorage.getItem("token");
  return axios.get(`${BASE_URL}/api/students`, {
    headers: { token },
  });
};

const editStudent = async (updatedData) => {
  const token = await AsyncStorage.getItem("token");
  return axios.put(`${BASE_URL}/api/editstudent`, updatedData, {
    headers: { token },
  });
};

const deleteStudent = async (studentId) => {
  const token = await AsyncStorage.getItem("token");
  return axios.delete(`${BASE_URL}/api/deletestudent/${studentId}`, {
    headers: { token },
  });
};

export default {
  login,
  register,
  getUserById,
  getAllStudents,
  editStudent,
  deleteStudent,
};
