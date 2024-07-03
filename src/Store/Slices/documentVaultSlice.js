import { createSlice } from "@reduxjs/toolkit";

export const documentVaultSlice = createSlice({
  name: "documentVault",
  initialState: {
    isLoading: false,
    message: "",
  },
  reducers: {
    onGetdocumentVault: (state) => {
      return {
        ...state,
        isLoading: true,
        getdocumentVaultData: [],
        message: "",
      };
    },

    onGetdocumentVaultSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        getdocumentVaultData:data,
        message,
        status_code,
      };
    },

    onGetdocumentVaultError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        getdocumentVaultData:data,
        message,
        status_code,
        isLoading: false,
      };
    },
    onGetdocumentVaultReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getdocumentVaultData: [],
        message: "",
        status_code: null,
      };
    },
  },
});
export const {
  onGetdocumentVault,
  onGetdocumentVaultSuccess,
  onGetdocumentVaultError,
} = documentVaultSlice.actions;

export default documentVaultSlice.reducer;
