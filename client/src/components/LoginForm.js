import React, { useState } from "react";
import Axios from "axios";
import config from "../config.json";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  Axios.defaults.withCredentials = true;

  const login = (event) => {
    event.preventDefault();
    const data = { email: loginEmail, password: loginPassword };
    console.log(data);
    Axios.post(`http://${config.domain}:${config.port}/users/login`, data)
      .then((result) => {
        store.addNotification({
          title: "Login succeeded:",
          message: result.data.message,
          type: "success",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 750,
          },
        });
      })
      .catch((e) => {
        store.addNotification({
          title: "Registration failed:",
          message: e.response.data.message,
          type: "danger",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 750,
          },
        });
      });
  };

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = (event) => {
    event.preventDefault();
    const data = { email: registerEmail, password: registerPassword };
    console.log(data);

    Axios.post(`http://${config.domain}:${config.port}/users/register`, data)
      .then((result) => {
        store.addNotification({
          title: "Registration succeeded:",
          message: result.data.message,
          type: "success",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 750,
          },
        });
      })
      .catch((e) => {
        store.addNotification({
          title: "Registration failed:",
          message: e.response.data.message,
          type: "danger",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 750,
          },
        });
      });
  };

  return (
    <div className="auth">
      <form className="login">
        <h2> Login </h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </div>
        <input type="submit" value="Submit" onClick={(ev) => login(ev)} />
      </form>

      <form className="register">
        <h2> Register </h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
        </div>
        <input type="submit" value="Submit" onClick={(ev) => register(ev)} />
      </form>
    </div>
  );
}
export default LoginForm;
