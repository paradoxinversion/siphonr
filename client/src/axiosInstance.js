import axios from "axios";

const baseURL = window.location.host.includes("localhost")
  ? "http://localhost:3001/api/"
  : "http://siphonr.herokuapp.com/api/";

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
