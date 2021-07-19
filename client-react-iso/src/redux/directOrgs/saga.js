import { put, all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import * as doApi from "@apis/directOrgs";
import * as dOTypes from "./types";
import * as doActions from "./actions";

export function* getFilterDirectOrgStart({ payload }) {
  try {
    const result = yield doApi.getFilterDirectOrg(payload.token, payload.data);
    yield put(doActions.getFilterDirectOrgSuccess(result.data));
  } catch (err) {
    yield put(doActions.getFilterDirectOrgFail(err));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(dOTypes.GET_FILTER_DIRECT_ORG_START, getFilterDirectOrgStart)]);
}
