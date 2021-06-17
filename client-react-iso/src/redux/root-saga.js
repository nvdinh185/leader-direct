import { all } from "redux-saga/effects";
import authSagas from "@redux/auth/saga";
import scrumBoardSaga from "@redux/scrumBoard/saga";

export default function* rootSaga(getState) {
  yield all([authSagas(), scrumBoardSaga()]);
}
