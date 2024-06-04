import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const callLoginApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.login, payload);
  return data;
};


