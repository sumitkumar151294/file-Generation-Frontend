import { all } from "redux-saga/effects";

import loginSaga from "./loginSaga";
import VariableSaga from "./varibaleSaga";
import clientMasterSaga from "./clientMasterSaga";
export default function* rootSaga() {
  yield all([
   loginSaga(),
VariableSaga(),
clientMasterSaga()
    ]);
}
