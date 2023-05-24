import { useState } from "react";
import { fileChange } from "../services/fileChange";

const Images = () => {
  const [image, setImage] = useState("");
  const handleFileChange = (e) => {
    // setButtonDisabled(true);

    fileChange(e)
      .then((response) => {
        console.log(response.data);
        // setUpdatedUser((prev) => ({...prev, [e.target.name]: response.data.image}));
        // setButtonDisabled(false);
      })
      .catch((err) => {
        // setButtonDisabled(false);
        console.log("Error while uploading the file: ", err);
      });
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleFileSubmit}>
        <input
          type='file'
          name='cloudinary'
          value={image}
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
};

export default Images;
