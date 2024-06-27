import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postTemplateVaribleApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.postTemplateVariableMaster, payload);
  return data;
};

