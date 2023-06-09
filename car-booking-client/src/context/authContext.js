import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { LoadingContext } from "./loadingContext";
import { get } from "../services/authService";

import { googleLogout } from "@react-oauth/google";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setIsLoading, setUser, userId, setUserId, setErrorMessage } =
    useContext(LoadingContext);

  const navigate = useNavigate();
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const googleSignup = useGoogleLogin({
    scope: ["https://www.googleapis.com/auth/calendar"],
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post("http://localhost:4000/auth/google", {
          // http://localhost:4000/auth/google backend that will exchange the code
          code,
        });
        // console.log("OAUTH TOKENS", tokens);
        const { accessToken, user, authToken } = tokens.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("authToken", authToken);

        navigate("/events");
        setUserId(user._id);
        // console.log("THIS IS THE USER ID", userId);
        setUser(user);
      } catch (error) {
        console.log("response", error.response.data);
        navigate("/");
      }
    },
    onError: (err) => {
      console.log("login failed", err);
      navigate("/");
    },
    flow: "auth-code",
  });

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");

    setIsLoading(true);

    if (token) {
      //check token validity
      get("/auth/verify")
        .then((results) => {
          console.log("Are we logged in?", results.data);
          setUser(results.data);
          setUserId(results.data._id);
        })
        .catch((err) => {
          localStorage.clear();
          setIsLoading(false);
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
          // console.log("This is the user", user)
          // console.log("LINee 38 message", message)
        });
    } else {
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    googleLogout();
    console.log("we've logged out");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignup, authenticateUser, logout, storeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
