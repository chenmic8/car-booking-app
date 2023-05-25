import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { post } from "../services/dataService";
import axios from "axios";
import {
  TextField,
  Stack,
  Box,
  Button,
  Typography,
  Link,
  dividerClasses,
} from "@mui/material";
import DateTimeSelector from "./DateTimeSelector";

const AddEvent = () => {
  let today = new Date();

  const { familyCars, familyLocations, familyUsers, family, user } =
    useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(today.setHours(today.getHours() + 1));
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [driver, setDriver] = useState(user._id);
  const [riders, setRiders] = useState([]);
  const [car, setCar] = useState(familyCars[0]._id);
  const [eventFormErrorMessage, setEventFormErrorMessage] = useState("");

  const dateTimeDifferenceInMinutes = (startTime, endTime) => {
    const startMinutes = new Date(startTime).getTime();
    const endMinutes = new Date(endTime).getTime();
    return (endMinutes - startMinutes) / 1000 / 60;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !startTime ||
      !endTime||
      // ADD THESE WHEN API IS IMPLEMENTED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !startLocation ||
      !endLocation ||
      !driver ||
      // !riders ||
      !car
    ) {
      setEventFormErrorMessage("Please provide all the required fields");
      return;
    } else if (dateTimeDifferenceInMinutes(startTime, endTime) < 0) {
      setEventFormErrorMessage("The start time has to be before the end time");
      return;
    } else {
      setEventFormErrorMessage("");
    }
    // (dateTimeDifferenceInMinutes(startTime, endTime));

    // dateToMinutes(startTime);
    // dateToMinutes(endTime);
    //TEST IF START TIME IS BEFORE END TIME
    //CALCULATE LENGTH OF EVENT

    // console.log(
    //   title,
    //   startTime,
    //   endTime,
    //   startLocation,
    //   endLocation,
    //   driver,
    //   riders,
    //   car
    // );
    try {
      console.log("HERE IS FAKE EVENT CREATION AXIOS POST REQUEST", {
        title,
        startTime,
        endTime,
        startLocation,
        endLocation,
        driver,
        riders,
        car,
      });

      const createdEvent = post(`/events/create/${family._id}`, {
        title,
        beginTime: startTime,
        endTime,
        startLocation,
        endLocation,
        driver,
        riders,
        car,
        distanceMeters: 1
      });
      console.log("CREATED AN EVENT: ", createdEvent.data);
    } catch (error) {
      setEventFormErrorMessage("Server Error")
      console.log(error);
    }
  };
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Typography variant='h5'>Add Event</Typography>
            {eventFormErrorMessage && <p>{eventFormErrorMessage}</p>}
            <label htmlFor='title'>Title:</label>
            <input
              type='text'
              id='title'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <TextField
              label='Title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              margin='normal'
            /> */}
            {/* <DateTimeSelector /> */}
            {/* <DateTimeSelector
              startValue={startTime}
              setStartValue={setStartTime}
              endValue={endTime}
              setEndValue={setEndTime}
            /> */}
            {/* <DateTimeSelector value={endTime} setValue={setEndTime} /> */}

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
            <select
              name='startLocation'
              id='startLocation'
              onChange={(e) => setStartLocation(e.target.value)}
            >
              {familyLocations.map((location) => {
                return <option value={location._id}>{location.name}</option>;
              })}
            </select>

            {/* <input
              type='text'
              id='startLocation'
              name='startLocation'
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
            <br /> */}

            <label htmlFor='endLocation'>End Location:</label>
            <select
              name='startLocation'
              id='startLocation'
              onChange={(e) => setEndLocation(e.target.value)}
            >
              <option value=""></option>
              {familyLocations.map((location) => {
                return <option value={location._id}>{location.name}</option>;
              })}
            </select>
            {/* <input
              type='text'
              id='endLocation'
              name='endLocation'
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
            />
            <br /> */}

            <label htmlFor='driver'>Driver:</label>
            <select
              name='driver'
              id='driver'
              onChange={(e) => setDriver(e.target.value)}
            >
              {familyUsers.map((driver) => {
                return <option value={driver._id}>{driver.firstName}</option>;
              })}
            </select>

            {/* <input
              type='text'
              id='driver'
              name='driver'
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            />
            <br /> */}

            <label htmlFor='riders'>Riders:</label>
            <select
              multiple
              name='riders'
              id='riders'
              onChange={(e) => setRiders(e.target.value)}
            >
              <option value=''></option>
              {familyUsers.map((rider) => {
                return <option value={rider._id}>{rider.firstName}</option>;
              })}
            </select>
            {/* <input
              type='text'
              id='riders'
              name='riders'
              value={riders}
              onChange={(e) => setRiders(e.target.value)}
            />
            <br /> */}

            <label htmlFor='car'>Car:</label>
            <select
              name='car'
              id='car'
              onChange={(e) => setCar(e.target.value)}
            >
              {familyCars.map((car, index) => {
                return (
                  <option value={car._id}>
                    {car.make} {car.model}
                  </option>
                );
              })}
            </select>
            {/* <input
              type='text'
              id='car'
              name='car'
              value={car}
              onChange={(e) => setCar(e.target.value)}
            />
            <br /> */}

            <button type='submit'>Submit</button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddEvent;
