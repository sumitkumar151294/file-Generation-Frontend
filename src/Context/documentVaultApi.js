import API from "../Common/Endpoint/serviceConstrants";
import axiosInstance from "../Common/Axios/axiosInstance";

export const getdocumentVault = async (payload) => {
  const { data = [] } = await axiosInstance.get(API.getDocumentVault, payload);
  return data;}
