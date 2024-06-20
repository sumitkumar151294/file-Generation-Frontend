import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postVariable = async (payload) => {
  const { data = [] } = await axiosInstance.post(API.postVariable, payload);
  return data;
};
export const getVariable = async (payload) => {
  const { data = [] } = await axiosInstance.get(API.getVariable, payload);
  return data;
};export const updateVariable = async (payload) => {
  const { data = [] } = await axiosInstance.put(API.updateVariable, payload);
  return data;
};
