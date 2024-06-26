import { createSlice } from "@reduxjs/toolkit";

export const clientMaster = createSlice({
  name: "client-master",
  initialState: {
    isLoading: false,
    message: "",
  },
  reducers: {
    onGetclientMaster: (state) => {
      return {
        ...state,
        isLoading: true,
       getclientMasterData: [],
        message: "",
      };
    },

    onGetclientMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        getclientMasterData:data,
        message,
        status_code,
      };
    },

    onGetclientMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getclientMasterData:data,
        message,
        status_code,
        isLoading: false,
      };
    },
    onGetclientMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getclientMasterData: [],
        message: "",
        status_code: null,
      };
    },
      onPostclientMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          postclientMasterData: [],
          postMessage: "",
        };
      },
    onPostclientMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        postclientMasterData:data,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostclientMasterError: (state, {payload}) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postclientMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
      };
    },
    onPostclientMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postclientMasterData: null,
        postMessage: "",
        post_status_code: null,
      };
    },

    onUpdateclientMaster: (state) => {
      
      return {
        ...state,
        isLoading: true,
        updatedclientMaster: [],
        updateMessage: "",
      };
    },

    onUpdateclientMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedclientMaster: data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateclientMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedclientMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
      };
    },
    onUpdateclientMasterReset: (state) => {
      return {
        ...state,
        updatedclientMaster: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
  },
});
export const { 
  onGetclientMaster,
  onGetclientMasterSuccess,
  onGetclientMasterError,
  onPostclientMaster,
  onPostclientMasterSuccess,
  onPostclientMasterError,
  onPostclientMasterReset,
  onUpdateclientMaster,
  onUpdateclientMasterSuccess,
  onUpdateclientMasterError,
  onUpdateclientMasterReset
} = clientMaster.actions;

export default clientMaster.reducer;
