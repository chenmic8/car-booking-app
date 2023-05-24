import { useState, useContext, useEffect } from "react";
import { post, get } from "../services/dataService";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingContext } from "../context/loadingContext";

const EditCar = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const { carId } = useParams();
  const navigate = useNavigate();
  const colors = ["Black", "White", "Gray", "Silver", "Blue", "Red", "Other"];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    new Array(30),
    (value, index) => currentYear - index
  );
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("Black");
  const [year, setYear] = useState(currentYear);
  const [carFormErrorMessage, setCarFormErrorMessage] = useState("");

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await post(`/cars/delete/${carId}`);
      setIsLoading(false);
      navigate("/cars");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!make) {
      setCarFormErrorMessage(
        'Please provide the "make" of your car (i.e. Chevy, Ford, Toyota)'
      );
      return;
    } else {
      setCarFormErrorMessage("");
    }
    console.log("HERE");

    try {
      setIsLoading(true);
      console.log("MADE IT TO TRY BLOCK UPDATING CAR CLIENT END");
      const updatedCar = await post(`/cars/update/${carId}`, {
        make,
        model,
        color,
        year,
      });
      setIsLoading(false);
      navigate("/cars");
      console.log("UPDATED CAR: ", updatedCar.data);
    } catch (error) {
      console.log("car handlesubmit catch error", error);
      setCarFormErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const foundCar = await get(`/cars/details/${carId}`);
        setMake(foundCar.data.make);
        setModel(foundCar.data.model);
        setColor(foundCar.data.color);
        setYear(foundCar.data.year);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCarDetails();
  }, []);
  return (
    <>
      <h2>Edit Car</h2>
      {carFormErrorMessage && <p>{carFormErrorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Make:</label>
        <input
          type='text'
          value={make}
          onChange={(e) => setMake(e.target.value)}
        />
        <br />
        <label>Model:</label>
        <input
          type='text'
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <br />
        <label>Color:</label>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          {colors.map((optionColor) => (
            <option key={optionColor} value={optionColor}>
              {optionColor}
            </option>
          ))}
        </select>
        <br />
        <label>Year:</label>
        <select name='year' onChange={(e) => setYear(Number(e.target.value))}>
          {years.map((year, index) => {
            return (
              <option key={`year${index}`} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <br />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default EditCar;
