import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
    isAdminLogin:null
  },
  reducers: {
    onLoginSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: {},
        isAdminLogin:null,
        status_code: null,
      };
    },

    onLoginSubmitSuccess: (state, { payload }) => {
      debugger
      const { data, message, status_code = 200 } = payload;
      return {
        ...state,
        data,
        isLoading: false,
        isError: false,
        isAdminLogin:true,
        status_code,
        message,
        error: {},
      };
    },

    onLoginSubmitError: (state, { payload }) => {
      const { message, status_code = 400 } = payload;
      return {
        ...state,
        status_code,
        isLoading: false,
        isError: true,
        message,
        isAdminLogin:null,
        error: {},
      };
    },
    onLogout: (state) => {
      return {
        ...state,
        data: {},
        isError: false,
        isLoading: false,
        error: {},
        isAdminLogin:null,
        message: "",
      };
    },
  },
});
export const {
  onLoginSubmit,
  onLoginSubmitError,
  onLoginSubmitSuccess,
  onLogout,
} = loginSlice.actions;

export default loginSlice.reducer;
