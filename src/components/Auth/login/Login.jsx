import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/SignInSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import companyIcon from "../../../assets/tezoLogo.svg";

function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isSuccess = useSelector((state) => state.SignIn.success);
  const errorMessage = useSelector((state) => state.SignIn.error);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(login({ emailAddress, password }));
    } else {
      toast.warning("Please fill out all fields");
    }
  };

  const validate = () => {
    return emailAddress !== "" && password !== "";
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/mainpage/employees");
    } else if (errorMessage) {
      toast.error("Invalid details....");
    }
  }, [isSuccess, errorMessage, navigate]);

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <img src={companyIcon}/>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@example.com"
            value={emailAddress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
