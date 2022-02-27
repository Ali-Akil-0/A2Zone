import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const AmazonLogoUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png";
  return (
    <div className="login">
      <Link to="/">
        {/* Logo */}
        <img className="login__logo" alt="AmazonLogo" src={AmazonLogoUrl} />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input type="email" />
          <h5>Password</h5>
          <input type="password" />

          <button className="login__signInButton" type="submit">
            Sign In
          </button>
        </form>
        <button className="login__registerButton">
          Create you Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
