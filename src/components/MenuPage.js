import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Modal,
  OutlinedInput,
  Skeleton,
} from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/system";
import MenuCard from "./MenuCard";
import {
  addDocument,
  fetchMenu,
  fetchFeedbacks,
} from "../services/firestoreUtility";

const StyledInput = styled("input")({
  display: "none",
});

const MenuPage = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getMenuData = async () => {
    const unitId = "Xu0rDXPoC4BGxd6T1mFY";

    setLoading(true);
    const data = await fetchMenu(unitId);
    console.log(data);
    setDailyMenu(data);
    setLoading(false);
  };

  useEffect(() => {
    getMenuData();
  }, []);

  const refreshMenu = () => {
    getMenuData();
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabItem = (day, date) => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" mb={1}>
          {day}
        </Typography>
        <Typography variant="subtitle1">{date}</Typography>
      </Box>
    );
  };

  const UploadMenuForm = () => {
    return (
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
            Upload Menu
          </Typography>
          <OutlinedInput
            fullWidth
            readOnly
            // value={fileName}
            placeholder="Choose a file"
            sx={{ mb: 2, paddingRight: "0" }}
            endAdornment={
              <label htmlFor="upload-button">
                <StyledInput
                  id="upload-button"
                  type="file"
                  accept=".xlsx, .xls"
                  // onChange={handleFileChange}
                />
                <Box
                  px={2}
                  display="flex"
                  alignItems="center"
                  sx={{
                    backgroundColor: "customColors.grey.light",
                    height: "4rem",
                    borderRadius: "0 16px 16px 0",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="subtitle1">Browse</Typography>
                </Box>
              </label>
            }
          />

          <LoadingButton
            variant="contained"
            color="primary"
            // onClick={handleSave}
            // loading={isLoading}
            loadingPosition="start"
            sx={{
              width: "8rem",
              height: "2.4rem",
            }}
          >
            Upload
          </LoadingButton>
        </Box>
      </Modal>
    );
  };

  return (
    <Box py={6}>
      <Box display="flex" justifyContent="space-between" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "500",
            textDecoration: "underline",
            textUnderlineOffset: "0.5rem",
          }}
        >
          MENU
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<UploadRoundedIcon />}
          sx={{ height: "2.4rem" }}
          onClick={handleOpen}
        >
          Upload Menu
        </Button>
      </Box>
      {dailyMenu.length > 0 ? (
        <>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            // variant="scrollable"
            variant="fullWidth"
            scrollButtons="auto"
          >
            {dailyMenu.map((menuItem, index) => (
              <Tab key={index} label={tabItem(menuItem.day, menuItem.date)} />
            ))}
          </Tabs>
          {dailyMenu.map((menuItem, index) => (
            <Box key={index} hidden={selectedTab !== index} mt={6}>
              <Box display="flex" gap={4} justifyContent="center">
                <MenuCard
                  mealName="breakfast"
                  mealItems={menuItem.breakfast}
                  mealImage="/images/breakfast.jpg"
                  mealDate={menuItem.date}
                  menuId={menuItem.id}
                  refreshMenu={refreshMenu}
                />
                <MenuCard
                  mealName="lunch"
                  mealItems={menuItem.lunch}
                  mealImage="/images/lunch.jpg"
                  mealDate={menuItem.date}
                  menuId={menuItem.id}
                  refreshMenu={refreshMenu}
                />
                <MenuCard
                  mealName="dinner"
                  mealItems={menuItem.dinner}
                  mealImage="/images/dinner.jpg"
                  mealDate={menuItem.date}
                  menuId={menuItem.id}
                  refreshMenu={refreshMenu}
                />
              </Box>
            </Box>
          ))}
          <UploadMenuForm />
        </>
      ) : (
        <Box>
          <Skeleton variant="rounded" width="100%" height="90px" />
          <Box display="flex" gap={4} justifyContent="center" mt={6}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="300px"
                height="350px"
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MenuPage;
