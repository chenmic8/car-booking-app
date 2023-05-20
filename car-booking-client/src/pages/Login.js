import React, { useContext } from "react";
import { useState } from "react";
import { post } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";

const Login = () => {
  const { storeToken } = useContext(AuthContext);
  const { setUser, getToken } = useContext(LoadingContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //checks for if inputs are valid
    if (email.length === 0 || password.length === 0) {
      setLoginErrorMessage("Please enter your email and password");
      return;
    }
    try {
      const foundUser = await post("/auth/login", { email, password });
      console.log("FOUND USER: ", foundUser.data);
      storeToken(foundUser.data.authToken);
      setUser(foundUser.data.user);
    } catch (error) {
      console.log(error)
      setLoginErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <h2>Login</h2>
      {loginErrorMessage && <p>{loginErrorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;
