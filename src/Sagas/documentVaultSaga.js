import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGetdocumentVault,
  onGetdocumentVaultError,
  onGetdocumentVaultSuccess
} from "../Store/Slices/documentVaultSlice";

import { getdocumentVault } from "../Context/documentVaultApi";

function* GetdocumentVault() {
  try {
    const getdocumentVaultResponse = yield call(getdocumentVault);
    if (getdocumentVaultResponse.httpStatusCode === "200") {
      yield put(
        onGetdocumentVaultSuccess({
          data: getdocumentVaultResponse.response,
          message: getdocumentVaultResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetdocumentVaultError({
          data: getdocumentVaultResponse.response,
          message: getdocumentVaultResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetdocumentVaultError({ data: [], message, status_code: 400 }));
  }
}


export default function* documentVaultSaga() {
  yield takeLatest(onGetdocumentVault.type, GetdocumentVault);
}
