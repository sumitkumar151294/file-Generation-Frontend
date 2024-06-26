import { createSlice } from "@reduxjs/toolkit";

export const templateMaster = createSlice({
  name: "client-master",
  initialState: {
    isLoading: false,
    message: "",
  },
  reducers: {
    onGettemplateMaster: (state) => {
      return {
        ...state,
        isLoading: true,
       gettemplateMasterData: [],
        message: "",
      };
    },

    onGettemplateMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        gettemplateMasterData:data,
        message,
        status_code,
      };
    },

    onGettemplateMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        gettemplateMasterData:data,
        message,
        status_code,
        isLoading: false,
      };
    },
    onGettemplateMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        gettemplateMasterData: [],
        message: "",
        status_code: null,
      };
    },
      onPosttemplateMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          posttemplateMasterData: [],
          postMessage: "",
        };
      },
    onPosttemplateMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        posttemplateMasterData:data,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPosttemplateMasterError: (state, {payload}) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        posttemplateMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
      };
    },
    onPosttemplateMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        posttemplateMasterData: null,
        postMessage: "",
        post_status_code: null,
      };
    },

    onUpdatetemplateMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        updatedtemplateMaster: [],
        updateMessage: "",
      };
    },

    onUpdatetemplateMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedtemplateMaster: data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdatetemplateMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedtemplateMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
      };
    },
    onUpdatetemplateMasterReset: (state) => {
      return {
        ...state,
        updatedtemplateMaster: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
  },
});
export const { 
  onGettemplateMaster,
  onGettemplateMasterSuccess,
  onGettemplateMasterError,
  onPosttemplateMaster,
  onPosttemplateMasterSuccess,
  onPosttemplateMasterError,
  onPosttemplateMasterReset,
  onUpdatetemplateMaster,
  onUpdatetemplateMasterSuccess,
  onUpdatetemplateMasterError,
  onUpdatetemplateMasterReset
} = templateMaster.actions;

export default templateMaster.reducer;
