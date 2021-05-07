import React, { useState } from "react";
import Axios from "axios";

function LoginForm() {
  const [email, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const register = () => {
    Axios.post("https://localhost:5000/users/register", {
      email: email,
      password: passwd,
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <div className="auth">
      <form className="login">
        <h2> Login </h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <input type="submit" value="Submit" />
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
              setUsername(event.target.value);
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
              setPasswd(event.target.value);
            }}
          />
        </div>
        <input type="submit" value="Submit" onClick={register} />
      </form>
    </div>
  );
}
export default LoginForm;
