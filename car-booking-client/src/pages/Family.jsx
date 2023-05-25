import { useContext, useState } from "react";
import { LoadingContext } from "../context/loadingContext";
import FamilyDetails from "../components/FamilyDetails";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Family = () => {
  const { family, dataIsLoading } = useContext(LoadingContext);

  const [userId, setUserId] = useState("");
  const [addFamilyMemberErrorMessage, setAddFamilyMemberErrorMessage] =
    useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {!dataIsLoading ? (
        <>
          <Button onClick={handleOpen}>Add Member</Button>
          <FamilyDetails family={family} />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit}>
                <Typography>Add Family Member with their User ID</Typography>
                <TextField
                  label='User ID'
                  type='text'
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  margin='normal'
                />
                <Button type="submit">Add</Button>
              </form>
            </Box>
          </Modal>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Family;
