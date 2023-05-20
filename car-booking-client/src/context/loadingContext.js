import { createContext, useEffect, useState } from "react";
import { get } from "../services/dataService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getCars = () => {
    get("/cars/all-cars").then((results) => {
      setCars(results.data);
    });
  };

  useEffect(()=>{
    getToken();
  },[user])

  return (
    <LoadingContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        user,
        setUser,
        setIsLoading,
        isLoading,
        getToken,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
