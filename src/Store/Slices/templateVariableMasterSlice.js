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
    }
  },
});
export const {
  onPosttemplateVariableMaster,
  onPosttemplateVariableMasterSuccess,
  onPosttemplateVariableMasterError,
  onPosttemplateVariableMasterReset,

} = templateVariableMaster.actions;

export default templateVariableMaster.reducer;
