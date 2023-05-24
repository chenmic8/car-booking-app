import { Box, Grid, Typography, Button } from "@mui/material";

import EventCard from "../components/EventCard";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import { get } from "../services/dataService";
// import { Button } from "@mui/material";

const Events = () => {
  const { familyId, userId } = useContext(LoadingContext);
  const [events, setEvents] = useState([]);

  // const getEvents = async () => {
  //   try {
  //     const eventsResponse = await get(`/events/family-events/${familyId}`);
  //     setEvents(eventsResponse.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getFamilyId = async () => {
  //   try {
  //     const familyResponse = await get(`families/user-family/${userId}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // getEvents();
  //   console.log("EVENTS: ", events);
  // }, [familyId]);

  return (
    <>
      events
      {/* {events ? (
        <>
          <Button>Add Event</Button>
          <Typography>Show week</Typography>
          <Typography>Show day</Typography>

          {events.map((event) => {
            return <EventCard key={event._id} event={event} />;
            // });
          })}
        </>
      ) : (
        <p>loading...</p>
      )} */}
    </>

    //FOR SEVEN COLUMNS, ONE FOR EACH DAY OF THE WEEK!!!!!!!!!!!!!!!!!!!!!!!
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} md={12 / 7}>
    //       {/* <Item>Sunday</Item> */}
    //       <Box sx={{ height: "100%", background: "red" }}>
    //         <Typography>Sunday</Typography>
    //         <EventCard />
    //       </Box>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Monday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Tuesday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Wednesday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Thursday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Friday</Typography>
    //     </Grid>
    //     <Grid item xs={12} md={12 / 7}>
    //       <Typography>Saturday</Typography>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default Events;
