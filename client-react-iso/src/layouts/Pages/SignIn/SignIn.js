import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "@components/uielements/input";
import Checkbox from "@components/uielements/checkbox";
import Button from "@components/uielements/button";
import IntlMessages from "@components/utility/intlMessages";
import { login } from "@redux/auth/actions";
import appAction from "@redux/app/actions";
import SignInStyleWrapper from "./SignIn.styles";

const { clearMenu } = appAction;

export default function SignIn() {
  let history = useHistory();
  let location = useLocation();
  const [loginForm, setLoginForm] = useState({});
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  function handleChangeForm(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    let code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      handleLogin();
    }
  }

  function handleLogin(e) {
    dispatch(login(loginForm.username, loginForm.password));
    dispatch(clearMenu());
    history.push("/app/dashboard");
  }

  let { from } = location.state || { from: { pathname: "/app" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/app">
              <IntlMessages id="page.signInTitle" />
            </Link>
          </div>
          <div className="isoSignInForm">
            <form>
              <div className="isoInputWrapper">
                <Input name="username" size="large" placeholder="Tài khoản" autoComplete="true" onKeyUp={handleChangeForm} />
              </div>

              <div className="isoInputWrapper">
                <Input
                  name="password"
                  size="large"
                  type="password"
                  placeholder="Mật Khẩu"
                  autoComplete="false"
                  onKeyUp={handleChangeForm}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
