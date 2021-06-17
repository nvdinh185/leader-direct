import { combineReducers } from "redux";
import App from "@redux/app/reducer";
import Auth from "@redux/auth/reducer";
import ThemeSwitcher from "@redux/themeSwitcher/reducer";
import LanguageSwitcher from "@redux/languageSwitcher/reducer";
import scrumBoard from "@redux/scrumBoard/reducer";
import drawer from "@redux/drawer/reducer";
import modal from "@redux/modal/reducer";

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  scrumBoard,
  modal,
  drawer,
});
