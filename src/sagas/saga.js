import { takeLatest, put, call } from "redux-saga/effects";
import { getData } from "../api/api";

function* asyncSearch(action) {
  const { payload } = action;

  var results = yield call(getData, payload);

  yield put({ type: "CREATE_FORECAST", payload: results });

  yield put({ type: "SET_PENDING", payload: false });
}

function* asyncRefresh(action) {
  const { payload } = action;

  var results = yield call(getData, payload.location);

  yield put({
    type: "REFRESH_FORECAST_ASYNC",
    payload: { results, id: payload.id },
  });

  yield put({ type: "SET_PENDING", payload: false });
}

export function* watchSearch() {
  yield takeLatest("REQUEST_DATA", asyncSearch);
}

export function* watchRefresh() {
  yield takeLatest("REFRESH_FORECAST", asyncRefresh);
}
