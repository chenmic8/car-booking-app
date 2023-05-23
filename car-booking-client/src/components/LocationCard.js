import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

const LocationCard = ({ location }) => {

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked!!");
  };
  
  return (
    <Card>
      <CardActionArea onClick={(e) => handleClick(e)}>
        <CardContent>
          <Typography variant='h6' component='div'>
            {location.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {location.address}
          </Typography>
          {/* <Typography variant='body2'>{}</Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LocationCard;
