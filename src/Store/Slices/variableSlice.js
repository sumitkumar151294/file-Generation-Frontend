import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "variable",
  initialState: {
    isLoading: false,
    isError: false,
    error: [],
    message: "",
  },
  reducers: {
    onGetVariable: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
       getVariableData: [],
        error: [],
        message: "",
      };
    },

    onGetVariableSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getVariableData:data,
        message,
        status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onGetVariableReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getVariableData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
      onPostVariable: (state) => {
        return {
          ...state,
          postLoading: true,
          isError: false,
          postVariableData: [],
          error: [],
          postMessage: "",
        };
      },
    onPostVariableSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        postVariableData:data,
        postMessage:message,
        post_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onPostVariableReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postVariableData: null,
        postMessage: "",
        error: [],
        post_status_code: null,
        isError: false,
      };
    },

    onUpdateVariable: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedVariable: [],
        error: [],
        updateMessage: "",
      };
    },

    onUpdateVariableSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedVariable: data,
        updateMessage:message,
        update_status_code:status_code,
        error: [],
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
        isError: true,
        error: [],
      };
    },
    onUpdateVariableReset: (state) => {
      return {
        ...state,
        isLoading: false,
        updatedVariable: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
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
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
