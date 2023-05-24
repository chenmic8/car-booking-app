import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";

const Family = () => {
  const { family } = useContext(LoadingContext);

  useEffect(() => {
    console.log("LOADING FAMILY IN FAMILY PAGE!!", family);
  }, [family]);

  return (
    <>
    stuff
      {/* {family ? (
        <>
          <p>temp</p>
          <div>Family name: {family.name}</div>
          <div>Addres</div>
          <div>{family.address.name}</div>
        </>
      ) : (
        <p>Loading...</p>
      )} */}

      {/* <div>Family address: {family.address}</div> */}
    </>
  );
};

export default Family;
