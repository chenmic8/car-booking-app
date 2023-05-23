import { useContext } from "react";
import { LoadingContext } from "../context/loadingContext";

const Family = () => {
  const { family } = useContext(LoadingContext);
  return (
    <>
      <div>Family name: {family.name}</div>
      <div>Family address: {family.address}</div>
    </>
  );
};

export default Family;
