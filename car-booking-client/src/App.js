import "./App.css";
import { AuthContext } from "./context/authContext";
import { LoadingContext } from "./context/loadingContext";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import NewEvent from "./pages/NewEvent";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const { getToken } = useContext(LoadingContext);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        {/* PROTECTED ROUTES */}
        {!getToken() && (
          <>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </>
        )}
        {getToken() && (
          <>
            <Route path='/cars' element={<Cars />} />
            <Route path='/new-event' element={<NewEvent />} />
            <Route path='/events' element={<Events />} />
            <Route path='/profile' element={<Profile />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
