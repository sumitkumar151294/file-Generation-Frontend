import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGetfileType,
  onGetfileTypeError,
  onGetfileTypeSuccess,
  onPostfileType,
  onPostfileTypeError,
  onPostfileTypeSuccess,
  onUpdatefileType,
  onUpdatefileTypeError,
  onUpdatefileTypeSuccess,
} from "../Store/Slices/fileTypeSlice";
import { getfileTypeApi, postfileTypeApi, updatefileTypeApi } from "../Context/fileTypeApi";


function* GetfileType() {
  try {
    const getfileTypeResponse = yield call(getfileTypeApi);
    if (getfileTypeResponse.httpStatusCode === "200") {
      yield put(
        onGetfileTypeSuccess({
          data: getfileTypeResponse.response,
          message: getfileTypeResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetfileTypeError({
          data: getfileTypeResponse.response,
          message: getfileTypeResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetfileTypeError({ data: [], message, status_code: 400 }));
  }
}
function* PostfileType({ payload }) {
  try {
    const postfileTypeResponse = yield call(postfileTypeApi, payload);
    if (postfileTypeResponse.httpStatusCode === "200") {
      yield put(
    onPostfileTypeSuccess({
          postData: postfileTypeResponse.response,
          message: postfileTypeResponse.errorMessage,
          status_code: postfileTypeResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostfileTypeError({
          data: postfileTypeResponse.response,
          message: postfileTypeResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    yield put(onPostfileTypeError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
  }
}

function* UpdatefileType({ payload }) {
  
  try {
    const updatefileTypeResponse = yield call(
      updatefileTypeApi,
      payload
    );
    if (updatefileTypeResponse.httpStatusCode === "200") {
      console.log(updatefileTypeResponse.httpStatusCode);
      yield put(
        onUpdatefileTypeSuccess({
          data: updatefileTypeResponse.response,
          message: updatefileTypeResponse.errorMessage,
          status_code: updatefileTypeResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onUpdatefileTypeError({
          data: updatefileTypeResponse.response,
          message: updatefileTypeResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdatefileTypeError({ data: [], message, status_code: 400 }));
  }
}

export default function* fileTypeSaga() {
  yield takeLatest(onGetfileType.type, GetfileType);
  yield takeLatest(onPostfileType.type, PostfileType);
  yield takeLatest(onUpdatefileType.type, UpdatefileType);
}
