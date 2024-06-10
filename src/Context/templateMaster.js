import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const postTemplateMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.posttemplatemaster, payload);
  return data;
};
export const getTemplateMasterApi = async (payload) => {
    const { data = {} } = await axiosInstance.get(API.gettemplatemaster, payload);
    return data;
  };


