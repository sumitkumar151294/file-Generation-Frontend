import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const AuthApi = async (payload) => {
    const { data = {} } = await axiosInstance.post(API.authConfig, payload);
    return data;
  };