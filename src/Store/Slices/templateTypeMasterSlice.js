import { createSlice } from "@reduxjs/toolkit";

export const templateTypeMaster = createSlice({
  name: "template-type-master",
  initialState: {
    isLoading: false,
    message: "",
  },
  reducers: {
    onGettemplateTypeMaster: (state) => {
      return {
        ...state,
        isLoading: true,
       gettemplateTypeMasterData: [],
        message: "",
      };
    },

    onGettemplateTypeMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        gettemplateTypeMasterData:data,
        message,
        status_code,
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
      };
    },
    onGettemplateTypeMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        gettemplateTypeMasterData: [],
        message: "",
        status_code: null,
      };
    },
      onPosttemplateTypeMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          posttemplateTypeMasterData: [],
          postMessage: "",
        };
      },
    onPosttemplateTypeMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        posttemplateTypeMasterData:data,
        postMessage:message,
        post_status_code:status_code,
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
      };
    },
    onPosttemplateTypeMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        posttemplateTypeMasterData: null,
        postMessage: "",
        post_status_code: null,
      };
    },

    onUpdatetemplateTypeMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        updatedtemplateTypeMaster: [],
        updateMessage: "",
      };
    },

    onUpdatetemplateTypeMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedtemplateTypeMaster: data,
        updateMessage:message,
        update_status_code:status_code,
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
      };
    },
    onUpdatetemplateTypeMasterReset: (state) => {
      return {
        ...state,
        updatedtemplateTypeMaster: [],
        updateMessage: "",
        update_status_code: null,
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
