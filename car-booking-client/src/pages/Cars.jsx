import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";
import { NavLink } from "react-router-dom";
import CarCard from "../components/CarCard";

const Cars = () => {
  const { familyCars } = useContext(LoadingContext);
  // console.log("CARS: ", cars);
  return (
    <>
      add car
      {familyCars.map((car) => {
        return (
          <CarCard key={car._id} car={car}/>
        );
      })}
    </>
  );
};

export default Cars;
