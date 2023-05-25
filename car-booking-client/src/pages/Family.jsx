import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";

const Family = () => {
  const { family, isLoading, } = useContext(LoadingContext);



  return (
    <>
      {!isLoading ? (
        <>
          <div>Family name: {family.name}</div>
          {/* <div>Family address: {family.address.name}</div> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Family;
