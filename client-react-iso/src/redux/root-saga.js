import { all, call } from "redux-saga/effects";
import scrumBoardSaga from "@redux/scrumBoard/saga";
import contactSagas from "@redux/contacts/saga";

export default function* rootSaga(getState) {
  yield all([scrumBoardSaga(), contactSagas()]);
}
