import "./App.css";
import { AuthContext } from "./context/authContext";
import { LoadingContext } from "./context/loadingContext";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Navbar from "./components/Navbar";
import { useState } from "react";
import axios from "axios";

function App() {
  const { googleSignup } = useContext(AuthContext);
  const { getToken } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [driver, setDriver] = useState("");
  const [riders, setRiders] = useState("");
  const [car, setCar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (
    //   !title ||
    //   !startTime ||
    //   !endTime ||
    //   !startLocation ||
    //   !endLocation ||
    //   !driver ||
    //   !riders ||
    //   !car
    // )
    //   return;
    console.log(
      title,
      startTime,
      endTime,
      startLocation,
      endLocation,
      driver,
      riders,
      car
    );
    axios.post("/api/create-event");
  };
  return (
    <div className='App'>
      {!getToken() && (
        <button onClick={googleSignup}>signup with google</button>
      )}
      {getToken() && (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor='startTime'>Start Time:</label>
            <input
              type='datetime-local'
              id='startTime'
              name='startTime'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <br />

            <label htmlFor='endTime'>End Time:</label>
            <input
              type='datetime-local'
              id='endTime'
              name='endTime'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <br />

            <label htmlFor='startLocation'>Start Location:</label>
            <input
              type='text'
              id='startLocation'
              name='startLocation'
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
            <br />

            <label htmlFor='endLocation'>End Location:</label>
            <input
              type='text'
              id='endLocation'
              name='endLocation'
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
            <br />

            <label htmlFor='driver'>Driver:</label>
            <input
              type='text'
              id='driver'
              name='driver'
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            />
            <br />

            <label htmlFor='riders'>Riders:</label>
            <input
              type='text'
              id='riders'
              name='riders'
              value={riders}
              onChange={(e) => setRiders(e.target.value)}
            />
            <br />

            <label htmlFor='car'>Car:</label>
            <input
              type='text'
              id='car'
              name='car'
              value={car}
              onChange={(e) => setCar(e.target.value)}
            />
            <br />

            <button type='submit'>Submit</button>
          </form>
        </div>
      )}

      {/* <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cars' element={<Cars />} />
    </Routes> */}
    </div>
  );
}

export default App;
