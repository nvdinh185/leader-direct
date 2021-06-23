import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "@components/uielements/input";
import Checkbox from "@components/uielements/checkbox";
import Button from "@components/uielements/button";
import authAction from "@redux/auth/actions";
import appActions from "@redux/app/actions";
import IntlMessages from "@components/utility/intlMessages";
import SignUpStyleWrapper from "./SignUp.styles";

const { login } = authAction;
const { clearMenu } = appActions;

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (token = false) => {
    console.log(token, "handlelogin");
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(login());
    }
    dispatch(clearMenu());
    history.push("/app");
  };
  return (
    <SignUpStyleWrapper className="isoSignUpPage">
      <div className="isoSignUpContentWrapper">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/app">
              <IntlMessages id="page.signUpTitle" />
            </Link>
          </div>

          <div className="isoSignUpForm">
            <div className="isoInputWrapper isoLeftRightComponent">
              <Input size="large" placeholder="First name" />
              <Input size="large" placeholder="Last name" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Username" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="Password" />
            </div>

            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="Confirm Password" />
            </div>

            <div className="isoInputWrapper" style={{ marginBottom: "50px" }}>
              <Checkbox>
                <IntlMessages id="page.signUpTermsConditions" />
              </Checkbox>
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">
                <IntlMessages id="page.signUpButton" />
              </Button>
            </div>
            <div className="isoInputWrapper isoOtherLogin">
              <Button onClick={handleLogin} type="primary" className="btnFacebook">
                <IntlMessages id="page.signUpFacebook" />
              </Button>
              <Button onClick={handleLogin} type="primary" className="btnGooglePlus">
                <IntlMessages id="page.signUpGooglePlus" />
              </Button>
            </div>
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
              <Link to="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignUpStyleWrapper>
  );
}
