import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const Login = () => {
  const History = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SignUp = (e) => {
    e.preventDefault();
    // firebase login
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        if (auth) {
          History("/", { replace: true });
        }

        // ...
      })
      .catch((error) => {
        alert(error);
      });
    setEmail("");
    setPassword("");
  };
  const SignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        History("/", { replace: true });
        // ...
      })
      .catch((error) => {
        alert(error);
      });
    setEmail("");
    setPassword("");
  };

  const AmazonLogoUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png";
  return (
    <div className="login">
      <Link to="/">
        {/* Logo */}
        <img className="login__logo" alt="AmazonLogo" src={AmazonLogoUrl} />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form className="login__form">
          <h5>Email</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={SignIn}
            className="login__signInButton"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <button onClick={SignUp} className="login__registerButton">
          Create you Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
