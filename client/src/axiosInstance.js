import axios from "axios";

const baseURL = window.location.host.includes("localhost")
  ? "http://localhost:3001/"
  : "http://siphonr.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL
});

export default axiosInstance;
