import React, { useState } from "react";
import "./signup.css";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const checkValidation = () => {
    let validationSucess = true;
    if (firstName === "") {
      setfirstNameError(true);
      validationSucess = false;
    }
    if (lastName === "") {
      setLastNameError(true);
      validationSucess = false;
    }
    if (email === "") {
      setEmailError(true);
      validationSucess = false;
    }
    if (password === "") {
      setPasswordError(true);
      validationSucess = false;
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      validationSucess = false;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      validationSucess = false;
    }
    return validationSucess;
  };
  const handleSubmit = async () => {
    if (checkValidation()) {
      let data = {
        name: firstName + " " + lastName,
        email,
        password
      };
      // Axios.post("/users", data)
      //   .then(res => {
      //     console.log(res);
      //     localStorage.setItem("token", res.data.token);
      //     console.log(localStorage.getItem("token"));
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
      try {
        let res = await Axios.post("/users", data);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("faliure");
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <div className="title">Google</div>
        <div className="create-font">Create your Google Acccount</div>
        <div className="input-box">
          <input
            placeholder="First name"
            className={`input-name ${firstNameError ? "input-error" : ""}`}
            value={firstName}
            onChange={e => {
              // e.target.value
              //   ? setfirstNameError(false)
              //   : setfirstNameError(true);

              setfirstNameError(e.target.value ? false : true);
              setfirstName(e.target.value);
            }}
          />
          <input
            placeholder="Last name"
            className={`input-name ${lastNameError ? "input-error" : ""}`}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="username-wrapper">
          <input
            placeholder="Username"
            className={`username ${emailError ? "input-error" : ""}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <span>You can use letters,numbers & periods</span>
          <span className="email-text">
            Use my current email address instead{" "}
          </span>
        </div>
        <div className="password-wrapper">
          <div className="password-box">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={passwordError ? "input-error" : ""}
            />
            <input
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className={confirmPasswordError ? "input-error" : ""}
            />
          </div>
          <span>Use 8 or more characters with a mix </span>
          <div className="show-password">
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            <span>show password</span>
          </div>
        </div>
        <div className="buttons">
          <Link to="/login">
            <button className="button-primary">Sign In Instead </button>
          </Link>
          <button className="button-primary" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
