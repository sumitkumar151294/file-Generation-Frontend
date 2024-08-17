import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";
export const posttemplateTypeMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.posttemplatetypemaster, payload);
  return data;
};export const gettemplateTypeMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.get(API.gettemplatetypemaster, payload);
  return data;
};
;export const updatetemplateTypeMasterApi = async (payload) => {
  const { data = {} } = await axiosInstance.post(API.updatetemplatetypemaster, payload);
  return data;
};


