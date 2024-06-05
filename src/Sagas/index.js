import { all } from "redux-saga/effects";

import loginSaga from "./loginSaga";
import VariableSaga from "./varibaleSaga";
export default function* rootSaga() {
  yield all([
   loginSaga(),
VariableSaga()
    ]);
}
