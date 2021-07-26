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
import directOrgReducer from "@redux/directOrgs/reducer";
import directAssReducer from "@redux/directAsses/reducer";
import filterDataReducer from "@redux/filterData/reducer";

export default combineReducers({
  Auth,
  App,
  adminUser: adminUserReducer,
  meetings: meetingReducer,
  directs: directReducer,
  directOrgs: directOrgReducer,
  directAsses: directAssReducer,
  filterData: filterDataReducer,
  ThemeSwitcher,
  LanguageSwitcher,
  scrumBoard,
  modal,
  drawer,
});
