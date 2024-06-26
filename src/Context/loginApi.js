import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postLoginApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postlogin, payload);
  return data;
};

