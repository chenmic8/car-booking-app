import {
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
// import CardActions from "@mui/material/CardActions";
// const bull = (
//   <Box
//     component='span'
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

const EventCard = ({ event }) => {
  const formatDate = (date) => {};
// console.log('EVENT: ')
  const handleClick = (e) => {
    e.preventDefault();
    console.log("CLICKED!THIS IS THIS EVENT'S ID", event);
  };

  return (
    <Card>
      <CardActionArea onClick={(e) => handleClick(e)}>
        <CardContent>
          <Typography variant='h6' component='div'>
            {event.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {event.beginTime} - {event.endTime}
          </Typography>
          {event.endLocation && <Typography variant='body2'>{event.endLocation.name}</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
