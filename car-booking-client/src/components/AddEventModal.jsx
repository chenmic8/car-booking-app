import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { LoadingContext } from "../context/loadingContext";
import { post } from "../services/dataService";
import axios from "axios";
import { TextField, Stack, Box, Button, Typography, Link } from "@mui/material";
import DateTimeSelector from "./DateTimeSelector";

const AddEvent = () => {
  let today = new Date();

  const { familyCars, familyLocations } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(today.setHours(today.getHours() + 1));
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [driver, setDriver] = useState("");
  const [riders, setRiders] = useState("");
  const [car, setCar] = useState("");
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
      !endTime
      // ADD THESE WHEN API IS IMPLEMENTED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // !startLocation ||
      // !endLocation ||
      // !driver ||
      // !riders ||
      // !car
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
      console.log("HERE IS FAKE EVENT CREATION AXIOS POST REQUEST");
      const createdEvent = post("/events/create", {
        title,
        startTime,
        endTime,
        startLocation,
        endLocation,
        driver,
        riders,
        car,
      });
      console.log("CREATED AN EVENT: ", createdEvent.data);
    } catch (error) {
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

            <TextField
              label='Title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              margin='normal'
            />
            <DateTimeSelector />
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
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddEvent;
