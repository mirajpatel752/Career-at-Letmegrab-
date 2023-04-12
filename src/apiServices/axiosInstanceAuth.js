import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BASE_DEV_URL;

const axiosInstanceAuth = axios.create({
  baseURL: BACKEND_URL,
});


axiosInstanceAuth.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstanceAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(error);
  }
);
export default axiosInstanceAuth;
