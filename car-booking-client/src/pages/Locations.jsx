import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import LocationCard from "../components/LocationCard";
import { Typography, Button } from "@mui/material";

const Locations = () => {
  const { familyLocations } = useContext(LoadingContext);

  console.log("FMAILY LOCATIONS ON LOCAIONTS PAGE", familyLocations);
  return (
    <>
      {familyLocations ? (
        <>
          <Typography variant="h5">Locations</Typography>
          <Button>Add location</Button>
          {familyLocations.map((location) => {
            return <LocationCard key={location._id} location={location} />;
          })}
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Locations;
