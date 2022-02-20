import React, { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../CSS/mymedia.css";

import {
  fireErrorAlert,
  fireSuccessAlert,
  areParamsDefined,
  isNameValid,
  changeBodyBackGround,
} from "../../helper/functions";
import { BASE_URL } from "../../config/config";

export default function LoginPage() {
  const navigate = useNavigate();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const backClick = () => {
    navigate("/");
  };

  const onRegisterClick = async () => {
    const areInputsDefined = areParamsDefined(
      email.current.value,
      password.current.value,
      lastName.current.value,
      firstName.current.value
    );
    const isFirstNameValid = isNameValid(firstName.current.value);
    const isLastNameValid = isNameValid(lastName.current.value);

    if (!areInputsDefined) {
      return fireErrorAlert("One or more fields are null");
    }
    if (!isFirstNameValid || !isLastNameValid) {
      return fireErrorAlert("Names must be letters");
    }

    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      if (response.data.registered) {
        await fireSuccessAlert(`Glad you registered ${response.data.user.firstName}!`);
        navigate("/");
      }
    } catch (error) {
      fireErrorAlert(error.response.data.error);
    }
  };

  changeBodyBackGround("linear-gradient(0.75turn, #4587bd, #9198e5)");
  return (
    <div>
      <div className="containerDiv">
        <h1 className="headerH1">Register</h1>
        <Row>
          <Col>
            <table className="loginTable">
              <tbody>
                <tr>
                  <td>
                    <label>First name</label>
                  </td>
                  <td>
                    <input ref={firstName} type={"text"} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Last name</label>
                  </td>
                  <td>
                    <input ref={lastName} type={"text"} />
                  </td>
                </tr>
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
              <button className="mainButton" onClick={onRegisterClick}>
                Register
              </button>
            </div>
            <br />
            <div>
              <span className="sideSpan">
                <button className="link" onClick={backClick}>
                  Back to login
                </button>
              </span>
            </div>
          </Col>
          <Col className="welcomeDiv">
            <div>
              <h3>Keep in mind!</h3> password should be longer then 7 letters. <br /> First name and
              last name should be at least 3 letters.
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
