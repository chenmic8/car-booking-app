import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const Family = () => {
  const { family, dataIsLoading } = useContext(LoadingContext);

  return (
    <>
      {!dataIsLoading ? (
        <>
          <div>Family name: {family.name}</div>
          {family.address && <p>{family.address.name}</p>}
          {family.users &&
            family.users.map((user) => {
              return <p key={user._id}>{user.firstName}</p>;
            })}
          {family.cars &&
            family.cars.map((car) => {
              return (
                <p key={car._id}>
                  {car.make} {car.model}
                </p>
              );
            })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Family;
