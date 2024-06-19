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
        isError: false,
       getfileTypeData: [],
        error: [],
        message: "",
      };
    },

    onGetfileTypeSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getfileTypeData:data,
        message,
        status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onGetfileTypeReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getfileTypeData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
      onPostfileType: (state) => {
        return {
          ...state,
          postLoading: true,
          isError: false,
          postfileTypeData: [],
          error: [],
          postMessage: "",
        };
      },
    onPostfileTypeSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        postfileTypeData:data,
        postMessage:message,
        post_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onPostfileTypeReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postfileTypeData: null,
        postMessage: "",
        error: [],
        post_status_code: null,
        isError: false,
      };
    },

    onUpdatefileType: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedfileType: [],
        error: [],
        updateMessage: "",
      };
    },

    onUpdatefileTypeSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedfileType: data,
        updateMessage:message,
        update_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onUpdatefileTypeReset: (state) => {
      return {
        ...state,
        updatedfileType: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
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
