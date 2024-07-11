import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postTemplateVaribleApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postTemplateVariableMaster, payload);
  return data;
};
export const updateTemplateVaribleApi = async (payload) => {
  const { data = {} } = await axiosInstance.put(API.updateTemplateVariableMaster, payload);
  return data;
};
export const getTemplateVaribleApi = async (payload) => {
  const { data = {} } = await axiosInstance.get(API.getTemplateVariableMaster, payload);
  return data;
};
