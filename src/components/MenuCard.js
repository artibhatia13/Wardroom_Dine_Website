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
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import db from "../config/firestore";
import { LoadingButton } from "@mui/lab";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const MenuCard = ({
  mealName,
  mealItems,
  mealImage,
  mealDate,
  refreshMenu,
}) => {
  const [open, setOpen] = useState(false);
  const [editedItems, setEditedItems] = useState([...mealItems]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddItem = () => {
    setEditedItems([...editedItems, ""]);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...editedItems];
    newItems[index] = value;
    setEditedItems(newItems);
  };
  const unitId = "Xu0rDXPoC4BGxd6T1mFY";

  const handleSave = async () => {
    console.log(editedItems);
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "weekly_menu"),
        where("unit_id", "==", unitId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      const docSnapshot = querySnapshot.docs[0];
      const docId = docSnapshot.id;
      const menuList = docSnapshot.data().menu_list;
      console.log(menuList);

      const updatedMenuList = menuList.map((menuItem) => {
        if (menuItem.date === mealDate) {
          return {
            ...menuItem,
            meals: {
              ...menuItem.meals,
              [mealName]: editedItems,
            },
          };
        }
        return menuItem;
      });

      console.log(updatedMenuList);

      // Update the document with the new menu list
      const docRef = doc(db, "weekly_menu", docId);
      await updateDoc(docRef, { menu_list: updatedMenuList });

      console.log("Meal items updated successfully!");
      refreshMenu();
    } catch (error) {
      console.error("Error updating meal items:", error);
    }

    setIsLoading(false);

    handleClose();
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

      {isLoading && <Box></Box>}

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
