import { createSlice } from "@reduxjs/toolkit";

export const templateMaster = createSlice({
  name: "client-master",
  initialState: {
    isLoading: false,
    isError: false,
    error: [],
    message: "",
  },
  reducers: {
    onGettemplateMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
       gettemplateMasterData: [],
        error: [],
        message: "",
      };
    },

    onGettemplateMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        gettemplateMasterData:data,
        message,
        status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onGettemplateMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        gettemplateMasterData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
      onPosttemplateMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          isError: false,
          posttemplateMasterData: [],
          error: [],
          postMessage: "",
        };
      },
    onPosttemplateMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        posttemplateMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onPosttemplateMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        posttemplateMasterData: null,
        postMessage: "",
        error: [],
        post_status_code: null,
        isError: false,
      };
    },

    onUpdatetemplateMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedtemplateMaster: [],
        error: [],
        updateMessage: "",
      };
    },

    onUpdatetemplateMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedtemplateMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onUpdatetemplateMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        updatedtemplateMaster: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
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
