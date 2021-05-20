import { takeLatest, put, call } from "redux-saga/effects";
import { getData } from "../api/api";

function* asyncSearch(action) {
  const { payload } = action;

  var results = yield call(getData, payload);

  yield put({ type: "CREATE_FORECAST", payload: results });
}

export function* watchSearch() {
  yield takeLatest("REQUEST_DATA", asyncSearch);
}
