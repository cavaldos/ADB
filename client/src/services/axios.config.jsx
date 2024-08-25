import axios from "axios";
import GetCookie from "../hooks/GetCookie";

const instance = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL: "http://coursera.zapto.org:5001",

  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const token = GetCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
