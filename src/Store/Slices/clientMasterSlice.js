import { createSlice } from "@reduxjs/toolkit";

export const clientMaster = createSlice({
  name: "client-master",
  initialState: {
    isLoading: false,
    isError: false,
    error: [],
    message: "",
  },
  reducers: {
    onGetclientMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
       getclientMasterData: [],
        error: [],
        message: "",
      };
    },

    onGetclientMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getclientMasterData:data,
        message,
        status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onGetclientMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getclientMasterData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
      onPostclientMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          isError: false,
          postclientMasterData: [],
          error: [],
          postMessage: "",
        };
      },
    onPostclientMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        postclientMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onPostclientMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postclientMasterData: null,
        postMessage: "",
        error: [],
        post_status_code: null,
        isError: false,
      };
    },

    onUpdateclientMaster: (state) => {
      
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedclientMaster: [],
        error: [],
        updateMessage: "",
      };
    },

    onUpdateclientMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedclientMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onUpdateclientMasterReset: (state) => {
      return {
        ...state,
        updatedclientMaster: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
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
