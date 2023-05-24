import { createContext, useEffect, useState } from "react";
import { get } from "../services/dataService";
// import { useNavigate } from "react-router-dom";
const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [cars, setCars] = useState([]);
  // const [events, setEvents] = useState([]);
  // const [family, setFamily] = useState({});
  // const [familyEvents, setFamilyEvents] = useState([]);
  // const [familySnapshots, setFamilySnapshots] = useState([]);
  // const [familyCars, setFamilyCars] = useState([]);
  // const [familyLocations, setFamilyLocations] = useState([]);
  // const [familyAddress, setFamilyAddress] = useState({});
  // const [familyName, setFamilyName] = useState("");
  // const [familyUsers, setFamilyUsers] = useState([]);
  // const [familyData, setFamilyData] = useState({});
  // const [familyId, setFamilyId] = useState("");
  // const [familyEventsId, setFamilyEventsId] = useState("");

  // const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  // const getCars = async () => {
  //   try {
  //     const allCars = await get("/cars/all-cars");
  //     setCars(allCars.data);
  //     // console.log("LOGGING ALL CARS: ", cars);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getFamilyInfo = async () => {
  //   try {
  //     const familyInfo = await get(`/families/user-family/${user._id}`);

  //     // console.log("FOUND TEH MEGALITH FAMILY DATA OBJECT: 😍", familyInfo.data);

  //     // setFamilyData(familyInfo.data);
  //     // console.log("FAMILY INFO,", familyData);

  //     setFamilyId(familyInfo.data.familyId);

  //     // setFamilyName(familyInfo.data.familyName);
  //     // setFamilyCars(familyInfo.data.familyCars);
  //     // setFamilyUsers(familyInfo.data.familyUsers);
  //     // setFamilyAddress(familyInfo.data.familyAddress);
  //     // setFamilyLocations(familyInfo.data.familyLocations);
  //     // // setFamilyEvents(familyInfo.data.familyEvents);
  //     // setFamilyEventsId(familyInfo.data.familyEvents[0]._id);

  //     console.log(familyId, "LOADING CONTEXT FAMILY id");
  //     // console.log(familyEvents, "LOADING CONTEXT FAMILY EVENTS");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const populateFamilyEvents = () => {
  //   setFamilyEvents(familyData.familyEvents);
  // };

  //DEPRECATED FUNCTION GETFAMILY()
  // const getFamily = async () => {
  //   try {
  //     // setIsLoading(true);
  //     const userFamily = await get(`/families/user-family/${user._id}`);
  //     // const familyEvents = await get(
  //     //   `/events/family-events/${userFamily.data._id}`
  //     // );
  //     const familySnapshots = await get(
  //       `/snapshots/family-snapshots/${userFamily.data._id}`
  //     );
  //     // const familyCars = await get(`/cars/family-cars/${userFamily.data._id}`);
  //     const familyLocations = await get(
  //       `/locations/family-locations/${userFamily.data._id}`
  //     );
  //     setFamily(userFamily.data);
  //     // Promise.all([userFamily, familySnapshots, familyLocations]).then(
  //     //   (response) => {
  //     //     console.log("DATA RESULT ❤️❤️❤️❤️❤️❤️❤️❤️❤️", response);
  //     //     setFamily(response);
  //     //     // setFamilyCars(userFamily.data.cars);
  //     //     // setFamilySnapshots(familySnapshots.data);
  //     //     // setFamilyLocations(familyLocations.data);
  //     //     // // setFamilyEvents(familyEvents.data);
  //     //     // setIsLoading(false);
  //     //   }
  //     // );

  //     // console.log("FOUND USERS FAMILY: ", userFamily.data);
  //     // console.log(
  //     //   "FOUND USERS FAMILY SNAPSHOTS 😊😊😊: ",
  //     //   familySnapshots.data
  //     // );
  //     // console.log("FOUND USERS FAMILY CARS: ", familyCars.data);

  //     // getFamilyEvents();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getFamilyEvents = async () => {
  //   try {
  //     const familyEvents = await get(`/events/family-events/${family._id}`);
  //     console.log("FOUND FAMILY EVENTS: ", familyEvents.data);
  //     setFamilyEvents(familyEvents.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getEvents = async () => {
  //   try {
  //     const allEvents = await get("/events/all-events");
  //     console.log("GOT ALL EVENTS: ", allEvents.data);
  //     setEvents(allEvents.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log('THIS IS A TEST')
  useEffect(() => {
    getToken();
    // getFamilyInfo();
    // getFamilyInfo();
    // setFamilyData()
    // if (!getToken) navigate("/");
    // getCars();
    // getFamilyInfo();
    // getFamilyEvents();
    // getFamilyEvents();
    // getFamily();
    // getEvents();
  }, [isLoading]);

  // useEffect(() => {
  //   populateFamilyEvents();
  // }, [familyEventsId]);
  // // useEffect(() => {
  // //   getFamilyInfo();
  // // }, [familyId]);

  return (
    <LoadingContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        user,
        setUser,
        // setIsLoading,
        // isLoading,
        // getToken,
        // cars,
        // setCars,
        // events,
        // setEvents,
        // getEvents,
        // family,
        // setFamily,
        // familyEvents,
        // setFamilyEvents,
        // // getFamilyEvents,
        // familySnapshots,
        // setFamilySnapshots,
        // familyCars,
        // setFamilyCars,
        // familyLocations,
        // setFamilyLocations,
        // familyAddress,
        // setFamilyAddress,
        // familyName,
        // setFamilyName,
        // familyUsers,
        // setFamilyUsers,
        // familyData,
        // setFamilyData,
        // familyId,
        // setFamilyId,
        // userId,
        // setUserId,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
