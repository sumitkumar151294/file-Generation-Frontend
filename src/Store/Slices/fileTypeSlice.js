import { createSlice } from "@reduxjs/toolkit";

export const fileType = createSlice({
  name: "file-type",
  initialState: {
    isLoading: false,
    isError: false,
    error: [],
    message: "",
  },
  reducers: {
    onGetfileType: (state) => {
      return {
        ...state,
        isLoading: true,
       getfileTypeData: [],
        message: "",
      };
    },

    onGetfileTypeSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        getfileTypeData:data,
        message,
        status_code,
      };
    },

    onGetfileTypeError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getfileTypeData:data,
        message,
        status_code,
        isLoading: false,
      };
    },
    onGetfileTypeReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getfileTypeData: [],
        message: "",
        status_code: null,
      };
    },
      onPostfileType: (state) => {
        return {
          ...state,
          postLoading: true,
          postfileTypeData: [],
          postMessage: "",
        };
      },
    onPostfileTypeSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        postfileTypeData:data,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostfileTypeError: (state, {payload}) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postfileTypeData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
      };
    },
    onPostfileTypeReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postfileTypeData: null,
        postMessage: "",
        post_status_code: null,
      };
    },

    onUpdatefileType: (state) => {
      return {
        ...state,
        isLoading: true,
        updatedfileType: [],
        updateMessage: "",
      };
    },

    onUpdatefileTypeSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedfileType: data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdatefileTypeError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedfileType: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
      };
    },
    onUpdatefileTypeReset: (state) => {
      return {
        ...state,
        updatedfileType: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
  },
});
export const { 
  onGetfileType,
  onGetfileTypeSuccess,
  onGetfileTypeError,
  onPostfileType,
  onPostfileTypeSuccess,
  onPostfileTypeError,
  onPostfileTypeReset,
  onUpdatefileType,
  onUpdatefileTypeSuccess,
  onUpdatefileTypeError,
  onUpdatefileTypeReset
} = fileType.actions;

export default fileType.reducer;
