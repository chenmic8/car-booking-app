import { useState, useContext } from "react";
import { post } from "../services/dataService";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/loadingContext";

const AddCar = () => {
  const { setIsLoading } = useContext(LoadingContext);
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
    try {
      setIsLoading(true);
      const createdCar = await post("/cars/create", {
        make,
        model,
        color,
        year,
      });
      setIsLoading(false);
      navigate("/cars");
      console.log("CREATED CAR: ", createdCar);
    } catch (error) {
      console.log("car handlesubmit catch error", error);
      setCarFormErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
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
    </>
  );
};

export default AddCar;
