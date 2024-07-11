import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGettemplateVariableMaster,
  onGettemplateVariableMasterError,
  onGettemplateVariableMasterSuccess,
  onPosttemplateVariableMaster,
  onPosttemplateVariableMasterError,
  onPosttemplateVariableMasterSuccess,
  onUpdatetemplateVariableMaster,
  onUpdatetemplateVariableMasterError,
  onUpdatetemplateVariableMasterSuccess,
} from "../Store/Slices/templateVariableMasterSlice";
import {  getTemplateVaribleApi, postTemplateVaribleApi, updateTemplateVaribleApi } from "../Context/templateVariableMasterApi";

function* gettemplateVariable() {
  try {
    const getVariableResponse = yield call(getTemplateVaribleApi);
    if (getVariableResponse.httpStatusCode === "200") {
      yield put(
        onGettemplateVariableMasterSuccess({
          data: getVariableResponse.response,
          message: getVariableResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGettemplateVariableMasterError({
          data: getVariableResponse.response,
          message: getVariableResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGettemplateVariableMasterError({ data: [], message, status_code: 400 }));
  }
}

function* PosttemplateVariableMaster({ payload }) {
  try {

    const posttemplateVariableMasterResponse = yield call(postTemplateVaribleApi, payload);
    if (posttemplateVariableMasterResponse.httpStatusCode === "201") {
      yield put(
    onPosttemplateVariableMasterSuccess({
          postData: posttemplateVariableMasterResponse.response,
          message: posttemplateVariableMasterResponse.errorMessage,
          status_code: posttemplateVariableMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPosttemplateVariableMasterError({
          data: posttemplateVariableMasterResponse.response,
          message: posttemplateVariableMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    yield put(onPosttemplateVariableMasterError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
  }
}
function* UpdatetemplateVariableMaster({ payload }) {
  try {
    const updatetemplateVariableMasterResponse = yield call(
      updateTemplateVaribleApi,
      payload
    );
    if (updatetemplateVariableMasterResponse.httpStatusCode === "201") {
      yield put(
        onUpdatetemplateVariableMasterSuccess({
          data: updatetemplateVariableMasterResponse.response,
          message: updatetemplateVariableMasterResponse.errorMessage,
          status_code: updatetemplateVariableMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdatetemplateVariableMasterError({
          data: updatetemplateVariableMasterResponse.response,
          message: updatetemplateVariableMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdatetemplateVariableMasterError({ data: [], message, status_code: 400 }));
  }
}


export default function* templateVariableMasterSaga() {

  yield takeLatest(onPosttemplateVariableMaster.type, PosttemplateVariableMaster);
  yield takeLatest(onUpdatetemplateVariableMaster.type, UpdatetemplateVariableMaster);
  yield takeLatest(onGettemplateVariableMaster.type, gettemplateVariable);


}
