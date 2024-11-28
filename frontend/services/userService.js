import axios from "axios";

const BASE_URL = "https://asere-transportation.com"; // Replace with your fly.io URL

const login = (loginObj) => {
  return axios.post(`${BASE_URL}/api/login`, loginObj);
};

const register = (registerObj) => {
  return axios.post(`${BASE_URL}/api/register`, registerObj);
};

export default { login, register };
