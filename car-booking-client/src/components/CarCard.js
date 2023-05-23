import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const CarCard = ({ car }) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked!!");
  };

  return (
    <Card>
      <CardActionArea onClick={(e) => handleClick(e)}>
        <CardContent>
          <Typography variant='h6' component='div'>
            {car.make + " " + car.model}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {car.year}
          </Typography>
          {/* <Typography variant='body2'>{}</Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarCard;
