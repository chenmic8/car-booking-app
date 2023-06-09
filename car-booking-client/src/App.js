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
import AddEvent from "./pages/AddEvent";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import Landing from "./pages/Landing";
import Family from "./pages/Family";
import Locations from "./pages/Locations";
import Images from "./pages/Images";

import { get } from "./services/dataService";

function App() {
  const { getToken, userId, setFamilyId } = useContext(LoadingContext);

  // const getFamilyId = async () => {
  //   const familyResponse = await get(`/families/user-family/${userId}`)
  //   setFamilyId(familyResponse.data._id)
  // };

  // useEffect(() => {
  //   getFamilyId();
  
  //   return () => {
  //     console.log('unmounting app.js')
  //   }
  // }, [userId])
  

  return (
    <div className='App'>
      {/* <Navbar /> */}

      {!getToken() && (
        <>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Landing />} />
          </Routes>
        </>
      )}

      {/* PROTECTED ROUTES */}
      {getToken() && (
        <>
          <Navbar>
            <Routes>
              <Route path='/cars' element={<Cars />} />
              <Route path='/cars/add-car' element={<AddCar />} />
              <Route path='/cars/details/:carId' element={<EditCar />} />
              <Route path='/new-event' element={<AddEvent />} />
              <Route path='/events' element={<Events />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/family' element={<Family />} />
              <Route path='/locations' element={<Locations />} />
              <Route path='/images' element={<Images />} />
              <Route path='*' element={<p>404 not found</p>} />
            </Routes>
          </Navbar>
        </>
      )}
    </div>
  );
}

export default App;
