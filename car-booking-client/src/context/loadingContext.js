import { createContext, useEffect, useState } from "react";
import { get } from "../services/dataService";
// import { useNavigate } from "react-router-dom";
const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [events, setEvents] = useState([]);
  const [family, setFamily] = useState({});
  const [familyEvents, setFamilyEvents] = useState([]);
  const [familySnapshots, setFamilySnapshots] = useState([]);
  const [familyCars, setFamilyCars] = useState([]);
  const [familyLocations, setFamilyLocations] = useState([]);

  // const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getCars = async () => {
    try {
      const allCars = await get("/cars/all-cars");
      setCars(allCars.data);
      // console.log("LOGGING ALL CARS: ", cars);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getFamilyInfo = async () => {
    try {
      // setIsLoading(true);
      const userFamily = await get(`/families/user-family/${user._id}`);
      // const familyEvents = await get(
      //   `/events/family-events/${userFamily.data._id}`
      // );
      console.log("USER IN GETFAMILYIFNO()", user);
      const familySnapshotsPromise = get(
        `/snapshots/family-snapshots/${userFamily.data._id}`
      );
      console.log("USER FAMILY ID IN GETFAMINFO()", userFamily);
      // const familyCars = await get(`/cars/family-cars/${userFamily.data._id}`);
      const familyLocationsPromise = get(
        `/locations/family-locations/${userFamily.data._id}`
      );

      console.log("FOUND USERS FAMILY: ", userFamily.data);
      // console.log("FOUND USERS FAMILY CARS: ", familyCars.data);

      setFamily(userFamily.data);
      setFamilyCars(userFamily.data.cars);
      // const familyDatas = await Promise.all([
      //   familySnapshotsPromise,
      //   familyLocationsPromise,
      // ]);
      const familySnapshots = await familySnapshotsPromise;
      setFamilySnapshots(familySnapshots.data);
      console.log(
        "FOUND USERS FAMILY SNAPSHOTS 😊😊😊: ",
        familySnapshots.data
      );
      
      const familyLocations = await familyLocationsPromise;
      setFamilyLocations(familyLocations.data);
      console.log("THESE ARE THE FAMILY LOCATIONS, 👍", familyLocations);
      // setFamilyEvents(familyEvents.data);
      setIsLoading(false);
      // getFamilyEvents();
    } catch (error) {
      console.log(error);
    }
  };

  // const getFamilyEvents = async () => {
  //   try {
  //     const familyEvents = await get(`/events/family-events/${family._id}`);
  //     console.log("FOUND FAMILY EVENTS: ", familyEvents.data);
  //     setFamilyEvents(familyEvents.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getEvents = async () => {
    try {
      const allEvents = await get("/events/all-events");
      console.log("GOT ALL EVENTS: ", allEvents.data);
      setEvents(allEvents.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
    // if (!getToken) navigate("/");
    // getCars();
    getFamilyInfo();
    // getFamilyEvents();
    // getFamilyEvents();
    // getEvents();
  }, [isLoading]);

  // useEffect(()=>{},[])

  return (
    <LoadingContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        user,
        setUser,
        setIsLoading,
        isLoading,
        getToken,
        cars,
        setCars,
        events,
        setEvents,
        getEvents,
        family,
        setFamily,
        familyEvents,
        setFamilyEvents,
        // getFamilyEvents,
        getFamilyInfo,
        familySnapshots,
        setFamilySnapshots,
        familyCars,
        setFamilyCars,
        familyLocations,
        setFamilyLocations,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
