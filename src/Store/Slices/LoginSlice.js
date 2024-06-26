import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: {},
    message: "",
    isUserLogin:null
  },
  reducers: {
    onLoginSubmit: (state) => {
      return {
        ...state,
        isLoading: true,

        isUserLogin:null,
        status_code: null,
      };
    },

    onLoginSubmitSuccess: (state, { payload }) => {
      const { data, message, status_code = 200 } = payload;
      return {
        ...state,
        data,
        isLoading: false,
        isUserLogin:true,
        status_code,
        message,
      };
    },

    onLoginSubmitError: (state, { payload }) => {
      const { message, status_code = 400 } = payload;
      return {
        ...state,
        status_code,
        isLoading: false,
        message,
        isUserLogin:null,
      };
    },
    onLogout: (state) => {
      return {
        ...state,
        data: {},
        isLoading: false,
        isUserLogin:null,
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
