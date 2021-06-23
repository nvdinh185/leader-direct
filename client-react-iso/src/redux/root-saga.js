import { all } from "redux-saga/effects";
import scrumBoardSaga from "@redux/scrumBoard/saga";

export default function* rootSaga(getState) {
  yield all([scrumBoardSaga()]);
}
