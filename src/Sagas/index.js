import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import VariableSaga from "./varibaleSaga";
import clientMasterSaga from "./clientMasterSaga";
import templateTypeMasterSaga from "./templateTypeMasterSaga";
import fileTypeSaga from "./fileTypeSaga";
export default function* rootSaga() {
  yield all([
    loginSaga(),
    fileTypeSaga(),
    VariableSaga(),
    clientMasterSaga(),
    templateTypeMasterSaga(),
  ]);
}
