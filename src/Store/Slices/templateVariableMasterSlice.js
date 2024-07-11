import { createSlice } from "@reduxjs/toolkit";

export const templateVariableMaster = createSlice({
  name: "templateVariableMaster",
  initialState: {
    isLoading: false,
    isError: false,
    error: [],
    message: "",
  },
  reducers: {
    onGettemplateVariableMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        posttemplateVariableMasterData: [],
        message: "",
      };
    },

    onGettemplateVariableMasterSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        posttemplateVariableMasterData:data,
        message,
        status_code,
      };
    },

    onGettemplateVariableMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        posttemplateVariableMasterData:data,
        message,
        status_code,
        isLoading: false,
      };
    },
    onGettemplateVariableMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        posttemplateVariableMasterData: [],
        message: "",
        status_code: null,
      };
    },
      onPosttemplateVariableMaster: (state) => {
        return {
          ...state,
          postLoading: true,
          posttemplateVariableMasterData: [],
          postMessage: "",
        };
      },
    onPosttemplateVariableMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        posttemplateVariableMasterData:data,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    onPosttemplateVariableMasterError: (state, {payload}) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        posttemplateVariableMasterData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
      };
    },
    onPosttemplateVariableMasterReset: (state) => {
      return {
        ...state,
        postLoading: false,
        posttemplateVariableMasterData: null,
        postMessage: "",
        post_status_code: null,
      };
    }  , onUpdatetemplateVariableMaster: (state) => {

      return {
        ...state,
        isLoading: true,
        updatedtemplateVariableMaster: [],
        updateMessage: "",
      };
    },

    onUpdatetemplateVariableMasterSuccess: (state, { payload }) => {

      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedtemplateVariableMaster: data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUpdatetemplateVariableMasterError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedtemplateVariableMaster: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
      };
    },
    onUpdatetemplateVariableMasterReset: (state) => {
      return {
        ...state,
        updatedtemplateVariableMaster: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
  },
});
export const {
  onPosttemplateVariableMaster,
  onPosttemplateVariableMasterSuccess,
  onPosttemplateVariableMasterError,
  onPosttemplateVariableMasterReset,
  onUpdatetemplateVariableMaster,onUpdatetemplateVariableMasterSuccess,onUpdatetemplateVariableMasterReset,onUpdatetemplateVariableMasterError,
  onGettemplateVariableMaster,onGettemplateVariableMasterSuccess,onGettemplateVariableMasterError,onGettemplateVariableMasterReset



} = templateVariableMaster.actions;

export default templateVariableMaster.reducer;
