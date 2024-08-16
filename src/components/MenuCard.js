import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CardMedia,
  IconButton,
  TextField,
  Modal,
} from "@mui/material"; // Added missing imports
import { LoadingButton } from "@mui/lab";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { editMenu } from "../services/firestoreUtility";

const MenuCard = ({
  mealName,
  mealItems,
  mealImage,
  mealDate,
  refreshMenu,
  menuId,
}) => {
  const [open, setOpen] = useState(false);
  const [editedItems, setEditedItems] = useState([...mealItems]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditedItems((prevItems) =>
      prevItems.filter((item) => item.trim() !== "")
    );
    setOpen(false);
  };

  const handleAddItem = () => {
    setEditedItems([...editedItems, ""]);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...editedItems];
    newItems[index] = value;
    setEditedItems(newItems);
  };

  const handleSave = async () => {
    console.log("inside");
    setIsLoading(true);

    // Remove empty items before saving
    const filteredItems = editedItems.filter((item) => item.trim() !== "");
    const isEdited = await editMenu(menuId, mealName, filteredItems);
    console.log(isEdited);
    if (isEdited) {
      refreshMenu();
      handleClose();
    } else {
      //give alert
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card sx={{ width: "22rem", borderRadius: "12px" }}>
        <CardMedia
          component="img"
          height="200px"
          image={mealImage}
          alt="meal Image"
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            position: "relative",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          <Box sx={{ position: "absolute", top: "10px", right: "20px" }}>
            <IconButton onClick={handleOpen}>
              <BorderColorRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            sx={{ textTransform: "uppercase", fontWeight: "600" }}
          >
            {mealName}
          </Typography>
          <Box mt={2}>
            {mealItems &&
              mealItems.map((item, idx) => (
                <Typography
                  variant="body1"
                  key={idx}
                  sx={{ textTransform: "capitalize" }}
                >
                  {item}
                </Typography>
              ))}
          </Box>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "16px",
            p: 6,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "500" }}>
            Edit {mealName}
          </Typography>
          {editedItems.map((item, index) => (
            <TextField
              key={index}
              fullWidth
              margin="normal"
              label={`Meal Item ${index + 1}`}
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              disabled={isLoading}
            />
          ))}
          <IconButton
            onClick={handleAddItem}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <AddRoundedIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              alignItems: "center",
            }}
          >
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleSave}
              loading={isLoading}
              loadingPosition="start"
              sx={{
                width: "8rem",
                height: "2.4rem",
              }}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MenuCard;
