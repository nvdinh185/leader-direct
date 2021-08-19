import { combineReducers } from "redux";
import App from "@redux/app/reducer";
import Auth from "@redux/auth/reducer";
import ThemeSwitcher from "@redux/themeSwitcher/reducer";
import LanguageSwitcher from "@redux/languageSwitcher/reducer";
import scrumBoard from "@redux/scrumBoard/reducer";
import drawer from "@redux/drawer/reducer";
import modal from "@redux/modal/reducer";
import adminUserReducer from "@redux/adminUsers/reducer";
import meetingReducer from "@redux/meetings/reducer";
import directReducer from "@redux/directs/reducer";
import directCritReducer from "@redux/directCrits/reducer";
import directOrgReducer from "@redux/directOrgs/reducer";
import directAssReducer from "@redux/directAsses/reducer";
import filterDataReducer from "@redux/filterData/reducer";
import reportReducer from "@redux/reports/reducer";
import Contacts from "@redux/contacts/reducer";

export default combineReducers({
  Auth,
  App,
  Contacts,
  adminUser: adminUserReducer,
  meetings: meetingReducer,
  directs: directReducer,
  directCrits: directCritReducer,
  directOrgs: directOrgReducer,
  directAsses: directAssReducer,
  filterData: filterDataReducer,
  reports: reportReducer,
  ThemeSwitcher,
  LanguageSwitcher,
  scrumBoard,
  modal,
  drawer,
});
