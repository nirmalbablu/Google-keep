import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setemail] = useState({
    value: "",
    error: false
  });
  const [passowrd, setPassword] = useState({
    value: "",
    error: false
  });
  const checkValidation = () => {
    let validationSucess = true;
    if (email.value === "") {
      setemail({ ...email, error: true });
      validationSucess = false;
    }
    if (passowrd.value === "") {
      setPassword({ ...passowrd, error: true });
      validationSucess = false;
    }
    return validationSucess;
  };
  const handleSubmit = async () => {
    if (checkValidation()) {
      let data = {
        email: email.value,
        password: passowrd.value
      };
      try {
        let res = await Axios.post("/users/login", data);
        console.log(res);
        localStorage.setItem("token", res.data.token);
      } catch (e) {
        console.log(e);
        alert(e);
      }
    } else {
      alert("login failed");
    }
  };
  return (
    <div className="signup-body">
      <div className="login-container">
        <div className="login-title">Google</div>
        <div>Sign in</div>
        <div>Use your Google Account</div>

        <input
          placeholder="Email or phone"
          className={email.error ? "input-error" : ""}
          onChange={e => setemail({ ...email, value: e.target.value })}
        />
        <input
          placeholder="password"
          className={email.error ? "input-error" : ""}
          onChange={e => setPassword({ ...passowrd, value: e.target.value })}
        />
        <span>Forget passsword</span>
        <div>Not your computer? Use Guest mode to sign in privately.</div>
        <div className="buttons">
          <Link to="/signup">
            <button className="button-primary">Create account</button>
          </Link>
          <button className="button-primary" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
