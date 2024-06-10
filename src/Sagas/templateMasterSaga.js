import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGettemplateMaster,
  onGettemplateMasterError,
  onGettemplateMasterSuccess,
  onPosttemplateMaster,
  onPosttemplateMasterError,
  onPosttemplateMasterSuccess,
} from "../Store/Slices/templateMasterSlice";
import { getTemplateMasterApi, postTemplateMasterApi } from "../Context/templateMaster";


function* GettemplateMaster() {
  try {
    const gettemplateMasterResponse = yield call(getTemplateMasterApi);
    if (gettemplateMasterResponse.httpStatusCode === "200") {
      yield put(
        onGettemplateMasterSuccess({
          data: gettemplateMasterResponse.response,
          message: gettemplateMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGettemplateMasterError({
          data: gettemplateMasterResponse.response,
          message: gettemplateMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGettemplateMasterError({ data: [], message, status_code: 400 }));
  }
}
function* PosttemplateMaster({ payload }) {
  try {
    const posttemplateMasterResponse = yield call(postTemplateMasterApi, payload);
    if (posttemplateMasterResponse.httpStatusCode === "201") {
      yield put(
    onPosttemplateMasterSuccess({
          postData: posttemplateMasterResponse.response,
          message: posttemplateMasterResponse.errorMessage,
          status_code: posttemplateMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPosttemplateMasterError({
          data: posttemplateMasterResponse.response,
          message: posttemplateMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    yield put(onPosttemplateMasterError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
  }
}

// function* UpdatetemplateMaster({ payload }) {
//   try {
//     const updatetemplateMasterResponse = yield call(
//       callCreatetemplateMasterUpdateApi,
//       payload
//     );
//     if (updatetemplateMasterResponse.httpStatusCode === "201") {
//       yield put(
//         onUpdatetemplateMasterSuccess({
//           data: updatetemplateMasterResponse.response,
//           message: updatetemplateMasterResponse.errorMessage,
//           status_code: updatetemplateMasterResponse.httpStatusCode,
//         })
//       );
//     } else {
//       yield put(
//         onUpdatetemplateMasterError({
//           data: updatetemplateMasterResponse.response,
//           message: updatetemplateMasterResponse.errorMessage,
//         })
//       );
//     }
//   } catch (error) {
//     const message = error.response || "Something went wrong";
//     yield put(onUpdatetemplateMasterError({ data: [], message, status_code: 400 }));
//   }
// }

export default function* templateMasterSaga() {
  yield takeLatest(onGettemplateMaster.type, GettemplateMaster);
  yield takeLatest(onPosttemplateMaster.type, PosttemplateMaster);
  // yield takeLatest(onUpdatetemplateMaster.type, UpdatetemplateMaster);
}
