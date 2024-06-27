import { call, put, takeLatest } from "redux-saga/effects";
import {
  onLoginAuthSubmit,
  onLoginAuthSuccess,
  onLoginAuthError,
} from "../Store/Slices/authSlice"
import { AuthApi } from "../Context/AuthApi";

function* LoginAuth({ payload }) {
  try {
    const loginAuthResponse = yield call(AuthApi, payload);
    if (loginAuthResponse?.httpStatusCode==="200") {
      yield put(
        onLoginAuthSuccess({
          data: loginAuthResponse.response,
          message: loginAuthResponse.response,
        })
      );
    } else {
      yield put(
        onLoginAuthError({
          data: loginAuthResponse.response,
          message: loginAuthResponse.errorMessage,
          status_code:loginAuthResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onLoginAuthError({ data: {}, message, status_code: error?.response?.data?.httpStatusCode }));
  }
}
export default function* loginAuthSaga() {
  yield takeLatest(onLoginAuthSubmit.type, LoginAuth);
}
