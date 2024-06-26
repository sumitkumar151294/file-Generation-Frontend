import { createSlice } from "@reduxjs/toolkit";

export const variableSlice = createSlice({
  name: "variable",
  initialState: {
    isLoading: false,
    message: "",
  },
  reducers: {
    onGetVariable: (state) => {
      return {
        ...state,
        isLoading: true,
        getVariableData: [],
        message: "",
      };
    },

    onGetVariableSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        getVariableData:data,
        message,
        status_code,
      };
    },

    onGetVariableError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getVariableData:data,
        message,
        status_code,
        isLoading: false,
      };
    },
    onGetVariableReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getVariableData: [],
        message: "",
        status_code: null,
      };
    },
      onPostVariable: (state) => {
        return {
          ...state,
          postLoading: true,
          postVariableData: [],
          postMessage: "",
        };
      },
    onPostVariableSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        postVariableData:data,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPostVariableError: (state, {payload}) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postVariableData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
      };
    },
    onPostVariableReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postVariableData: null,
        postMessage: "",
        post_status_code: null,
      };
    },

    onUpdateVariable: (state) => {
      return {
        ...state,
        isLoading: true,
        updatedVariable: [],
        updateMessage: "",
      };
    },

    onUpdateVariableSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedVariable: data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdateVariableError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedVariable: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
      };
    },
    onUpdateVariableReset: (state) => {
      return {
        ...state,
        updatedVariable: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
  },
});
export const { 
  onGetVariable,
  onGetVariableSuccess,
  onGetVariableError,
  onPostVariable,
  onPostVariableSuccess,
  onPostVariableError,
  onPostVariableReset,
  onUpdateVariable,
  onUpdateVariableSuccess,
  onUpdateVariableError,
  onUpdateVariableReset
} = variableSlice.actions;

export default variableSlice.reducer;
