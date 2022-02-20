import React, { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../CSS/mymedia.css";

import { updateCurrentUser } from "../../reduxActions/actions";
import { fireErrorAlert, fireSuccessAlert, areParamsDefined } from "../../helper/functions";
import { BASE_URL } from "../../config/config";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const registerClick = () => {
    navigate("/register");
  };

  const onLoginClick = async () => {
    if (areParamsDefined(email.current.value, password.current.value)) {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email: email.current.value,
          password: password.current.value,
        });
        if (response.data.login) {
          updateCurrentUser(dispatch, response.data.user);
          await fireSuccessAlert(`Welcome ${response.data.user.firstName}`);
          navigate("/users");
        }
      } catch (error) {
        fireErrorAlert(error.response.data.error);
      }
    } else {
      fireErrorAlert("Email or password are null");
    }
  };

  const root = document.querySelector(":root");
  root.style.setProperty("--body-bg-color", "linear-gradient(0.75turn, #4587bd, #9198e5)");
  return (
    <div>
      <div className="containerDiv">
        <h1 className="headerH1">Login</h1>
        <Row>
          <Col>
            <table className="loginTable">
              <tbody>
                <tr>
                  <td>
                    <label>Email</label>
                  </td>
                  <td>
                    <input ref={email} type={"text"} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Password</label>
                  </td>
                  <td>
                    <input ref={password} type={"password"} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <div className="buttonDiv">
              <button className="mainButton" onClick={onLoginClick}>
                Login
              </button>
            </div>
            <br />
            <div>
              <span className="sideSpan">
                Don't have an account?{" "}
                <button className="link" onClick={registerClick}>
                  Register here
                </button>
              </span>
            </div>
          </Col>
          <Col className="welcomeDiv">
            <div>
              <h3>Welcome!</h3> Be sure to check your password
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
