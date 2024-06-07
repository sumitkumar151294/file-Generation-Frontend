import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postfileTypeApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postfileType, payload);
  return data;
};
export const getfileTypeApi = async (payload) => {
    const { data = {} } = await axiosInstance.get(API.getfileType, payload);
    return data;
  };


