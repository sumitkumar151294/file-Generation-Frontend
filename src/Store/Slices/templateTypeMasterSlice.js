import { createSlice } from "@reduxjs/toolkit";

export const templateTypeMaster = createSlice({
  name: "template-type-master",
  initialState: {
    isLoading: false,
    isError: false,
    error: [],
    message: "",
  },
  reducers: {
    onGettemplateTypeMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
       gettemplateTypeMasterData: [],
        error: [],
        message: "",
      };
    },

    onGettemplateTypeMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        gettemplateTypeMasterData:data,
        message,
        status_code,
        error: [],
      };
    },

    onGettemplateTypeMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        gettemplateTypeMasterData:data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: [],
      };
    },
    onGettemplateTypeMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        gettemplateTypeMasterData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
      onPosttemplateTypeMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          isError: false,
          posttemplateTypeMasterData: [],
          error: [],
          postMessage: "",
        };
      },
    onPosttemplateTypeMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        posttemplateTypeMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        error: [],
      };
    },

    onPosttemplateTypeMasterError: (state, {payload}) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        posttemplateTypeMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
        isError: true,
        error: [],
      };
    },
    onPosttemplateTypeMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        posttemplateTypeMasterData: null,
        postMessage: "",
        error: [],
        post_status_code: null,
        isError: false,
      };
    },

    onUpdatetemplateTypeMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedtemplateTypeMaster: [],
        error: [],
        updateMessage: "",
      };
    },

    onUpdatetemplateTypeMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedtemplateTypeMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        error: [],
      };
    },

    onUpdatetemplateTypeMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedtemplateTypeMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
        isError: true,
        error: [],
      };
    },
    onUpdatetemplateTypeMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        updatedtemplateTypeMaster: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
      };
    },
  },
});
export const { 
  onGettemplateTypeMaster,
  onGettemplateTypeMasterSuccess,
  onGettemplateTypeMasterError,
  onPosttemplateTypeMaster,
  onPosttemplateTypeMasterSuccess,
  onPosttemplateTypeMasterError,
  onPosttemplateTypeMasterReset,
  onUpdatetemplateTypeMaster,
  onUpdatetemplateTypeMasterSuccess,
  onUpdatetemplateTypeMasterError,
  onUpdatetemplateTypeMasterReset
} = templateTypeMaster.actions;

export default templateTypeMaster.reducer;
