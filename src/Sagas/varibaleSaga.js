import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGetVariable,
  onGetVariableError,
  onGetVariableSuccess,
  onPostVariable,
  onPostVariableError,
  onPostVariableSuccess,
  onUpdateVariable,
  onUpdateVariableSuccess,
  onUpdateVariableError,
} from "../Store/Slices/variableSlice";

import { getVariable, postVariable } from "../Context/variableApi";

function* GetVariable() {
  try {
    const getVariableResponse = yield call(getVariable);
    if (getVariableResponse.httpStatusCode === "200") {
      yield put(
        onGetVariableSuccess({
          data: getVariableResponse.response,
          message: getVariableResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetVariableError({
          data: getVariableResponse.response,
          message: getVariableResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetVariableError({ data: [], message, status_code: 400 }));
  }
}
function* PostVariable({ payload }) {
  try {
    const postVariableResponse = yield call(postVariable, payload);
    if (postVariableResponse.httpStatusCode === "201") {
      yield put(
        onPostVariableSuccess({
          postData: postVariableResponse.response,
          message: postVariableResponse.errorMessage,
          status_code: postVariableResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostVariableError({
          data: postVariableResponse.response,
          message: postVariableResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    yield put(onPostVariableError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
  }
}

// function* UpdateVariable({ payload }) {
//   try {
//     const updateVariableResponse = yield call(
//       callCreateVariableUpdateApi,
//       payload
//     );
//     if (updateVariableResponse.httpStatusCode === "201") {
//       yield put(
//         onUpdateVariableSuccess({
//           data: updateVariableResponse.response,
//           message: updateVariableResponse.errorMessage,
//           status_code: updateVariableResponse.httpStatusCode,
//         })
//       );
//     } else {
//       yield put(
//         onUpdateVariableError({
//           data: updateVariableResponse.response,
//           message: updateVariableResponse.errorMessage,
//         })
//       );
//     }
//   } catch (error) {
//     const message = error.response || "Something went wrong";
//     yield put(onUpdateVariableError({ data: [], message, status_code: 400 }));
//   }
// }

export default function* VariableSaga() {
  yield takeLatest(onGetVariable.type, GetVariable);
  yield takeLatest(onPostVariable.type, PostVariable);
  // yield takeLatest(onUpdateVariable.type, UpdateVariable);
}
