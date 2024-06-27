import { call, put, takeLatest } from "redux-saga/effects";
import {
  onPosttemplateVariableMaster,
  onPosttemplateVariableMasterError,
  onPosttemplateVariableMasterSuccess,
} from "../Store/Slices/templateVariableMasterSlice";
import {  postTemplateVaribleApi } from "../Context/templateVariableMasterApi";



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


export default function* templateVariableMasterSaga() {

  yield takeLatest(onPosttemplateVariableMaster.type, PosttemplateVariableMaster);

}
