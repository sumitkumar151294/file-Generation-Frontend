import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postLoginApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postlogin, payload);
  return data;
};
export const getLoginApi = async (payload) => {
  const { data = {} } = await axiosInstance.get(API.postlogin, payload);
  return data;
};
export const updateLoginApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.postlogin, payload);
  return data;
};
