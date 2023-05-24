import { useContext, useEffect } from "react";
import { LoadingContext } from "../context/loadingContext";

const Family = () => {
  const { family } = useContext(LoadingContext);

    useEffect(()=>{console.log('LOADING FAMILY!!')},[family])

  return (
    <>
      <div>Family name: {family.name}</div>
      <div>Family address: {family.address}</div>
    </>
  );
};

export default Family;
