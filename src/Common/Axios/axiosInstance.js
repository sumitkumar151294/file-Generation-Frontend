import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
        sessionStorage.setItem("Unauthorized","true")
      if (window?.location?.pathname === "/") {
        toast.error("Unauthorized access - please log in again.");
      } else {
        toast.error("Unauthorized access - please log in again.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
