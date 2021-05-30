//import logo from "./logo.svg";
import "./App.css";
import "./components/LoginForm.js";
import LoginForm from "./components/LoginForm.js";
import MainPage from "./components/MainPage.js";
import ReactNotification from "react-notifications-component";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import config from "./config.json";

function App() {
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    Axios.get(`http://${config.domain}:${config.port}/users/login`).then(
      (result) => {
        console.log("recieved from backend: " + result.data.user);
        setLoginStatus(result.data.user);
        console.log("login status: " + loginStatus);
      }
    );
  }, []);

  const getPage = () => {
    if (loginStatus) {
      return <MainPage />;
    } else {
      return <LoginForm />;
    }
  };

  return (
    <div className="App">
      <ReactNotification />
    </div>
  );
}

export default App;
