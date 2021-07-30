import { all, call } from "redux-saga/effects";
import scrumBoardSaga from "@redux/scrumBoard/saga";
import contactSagas from "@redux/contacts/saga";
import directOrgSaga from "@redux/directOrgs/saga";

export default function* rootSaga(getState) {
  yield all([scrumBoardSaga(), call(directOrgSaga), contactSagas()]);
}
