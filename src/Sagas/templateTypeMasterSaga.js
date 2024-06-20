import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGettemplateTypeMaster,
  onGettemplateTypeMasterError,
  onGettemplateTypeMasterSuccess,
  onPosttemplateTypeMaster,
  onPosttemplateTypeMasterError,
  onPosttemplateTypeMasterSuccess,
  onUpdatetemplateTypeMaster,
  onUpdatetemplateTypeMasterError,
  onUpdatetemplateTypeMasterSuccess,
} from "../Store/Slices/templateTypeMasterSlice";
import { gettemplateTypeMasterApi, posttemplateTypeMasterApi, updatetemplateTypeMasterApi } from "../Context/templateTypeMasterApi";


function* GettemplateTypeMaster() {
  try {
    const gettemplateTypeMasterResponse = yield call(gettemplateTypeMasterApi);
    if (gettemplateTypeMasterResponse.httpStatusCode === "200") {
      yield put(
        onGettemplateTypeMasterSuccess({
          data: gettemplateTypeMasterResponse.response,
          message: gettemplateTypeMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGettemplateTypeMasterError({
          data: gettemplateTypeMasterResponse.response,
          message: gettemplateTypeMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGettemplateTypeMasterError({ data: [], message, status_code: 400 }));
  }
}
function* PosttemplateTypeMaster({ payload }) {
  try {
    const posttemplateTypeMasterResponse = yield call(posttemplateTypeMasterApi, payload);
    if (posttemplateTypeMasterResponse.httpStatusCode === "201") {
      yield put(
    onPosttemplateTypeMasterSuccess({
          postData: posttemplateTypeMasterResponse.response,
          message: posttemplateTypeMasterResponse.errorMessage,
          status_code: posttemplateTypeMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPosttemplateTypeMasterError({
          data: posttemplateTypeMasterResponse.response,
          message: posttemplateTypeMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    yield put(onPosttemplateTypeMasterError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
  }
}

function* UpdatetemplateTypeMaster({ payload }) {
  try {
    const updatetemplateTypeMasterResponse = yield call(
      updatetemplateTypeMasterApi,
      payload
    );
    if (updatetemplateTypeMasterResponse.httpStatusCode === "201") {
      yield put(
        onUpdatetemplateTypeMasterSuccess({
          data: updatetemplateTypeMasterResponse.response,
          message: updatetemplateTypeMasterResponse.errorMessage,
          status_code: updatetemplateTypeMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdatetemplateTypeMasterError({
          data: updatetemplateTypeMasterResponse.response,
          message: updatetemplateTypeMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdatetemplateTypeMasterError({ data: [], message, status_code: 400 }));
  }
}

export default function* templateTypeMasterSaga() {
  yield takeLatest(onGettemplateTypeMaster.type, GettemplateTypeMaster);
  yield takeLatest(onPosttemplateTypeMaster.type, PosttemplateTypeMaster);
  yield takeLatest(onUpdatetemplateTypeMaster.type, UpdatetemplateTypeMaster);
}
