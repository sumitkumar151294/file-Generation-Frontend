import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGetclientMaster,
  onGetclientMasterError,
  onGetclientMasterSuccess,
  onPostclientMaster,
  onPostclientMasterError,
  onPostclientMasterSuccess,
} from "../Store/Slices/clientMasterSlice";
import { getClientMasterApi, postClientMasterApi } from "../Context/clientMasterApi";


function* GetclientMaster() {
  try {
    const getclientMasterResponse = yield call(getClientMasterApi);
    if (getclientMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetclientMasterSuccess({
          data: getclientMasterResponse.response,
          message: getclientMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetclientMasterError({
          data: getclientMasterResponse.response,
          message: getclientMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetclientMasterError({ data: [], message, status_code: 400 }));
  }
}
function* PostclientMaster({ payload }) {
  try {
    const postclientMasterResponse = yield call(postClientMasterApi, payload);
    if (postclientMasterResponse.httpStatusCode === "201") {
      yield put(
    onPostclientMasterSuccess({
          postData: postclientMasterResponse.response,
          message: postclientMasterResponse.errorMessage,
          status_code: postclientMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostclientMasterError({
          data: postclientMasterResponse.response,
          message: postclientMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    yield put(onPostclientMasterError({ data: [], message:error?.response?.data?.ErrorMessage, status_code: error?.response?.data?.HttpStatusCode }));
  }
}

// function* UpdateclientMaster({ payload }) {
//   try {
//     const updateclientMasterResponse = yield call(
//       callCreateclientMasterUpdateApi,
//       payload
//     );
//     if (updateclientMasterResponse.httpStatusCode === "201") {
//       yield put(
//         onUpdateclientMasterSuccess({
//           data: updateclientMasterResponse.response,
//           message: updateclientMasterResponse.errorMessage,
//           status_code: updateclientMasterResponse.httpStatusCode,
//         })
//       );
//     } else {
//       yield put(
//         onUpdateclientMasterError({
//           data: updateclientMasterResponse.response,
//           message: updateclientMasterResponse.errorMessage,
//         })
//       );
//     }
//   } catch (error) {
//     const message = error.response || "Something went wrong";
//     yield put(onUpdateclientMasterError({ data: [], message, status_code: 400 }));
//   }
// }

export default function* clientMasterSaga() {
  yield takeLatest(onGetclientMaster.type, GetclientMaster);
  yield takeLatest(onPostclientMaster.type, PostclientMaster);
  // yield takeLatest(onUpdateclientMaster.type, UpdateclientMaster);
}
