import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postClientMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postClientMaster, payload);
  return data;
};
export const getClientMasterApi = async (payload) => {
    const { data = {} } = await axiosInstance.get(API.getClientMaster, payload);
    return data;
  };
  export const putClientMasterApi = async (payload) => {
    const { data = {} } = await axiosInstance.put(API.putClientMaster, payload);
    return data;
  };

