import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Skeleton,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import MenuCard from "./MenuCard";
import { addDocument, fetchMenu } from "../services/firestoreUtility";
import {
  getCurrentWeekDates,
  getDayOfWeek,
  formatDateToString,
} from "../services/utility";
import { toast } from "react-toastify";
import { useUnitContext } from "../context/unitContext";
import UploadMenuForm from "./UploadMenu";

const MenuPage = () => {
  const [dailyMenu, setDailyMenu] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0); // State for controlling which set of tabs to show
  const { unit } = useUnitContext();
  const tabsPerPage = 7; // Number of tabs to display at a time

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getMenuData = async () => {
    setLoading(true);
    const { start, end } = getCurrentWeekDates();

    const response = await fetchMenu(unit.id, start, end);
    if (response.success) setDailyMenu(response.data);
    else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getMenuData();
  }, []);

  const CalculateActiveTab = () => {
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-"); // Format as DD-MM-YYYY
    const defaultIndex = dailyMenu.findIndex((menu) => menu.date === today);
    return defaultIndex === -1 ? 0 : defaultIndex;
  };

  useEffect(() => {
    if (dailyMenu.length > 0) {
      setStartIndex(0);
      setSelectedTab(CalculateActiveTab);
    }
  }, [dailyMenu]);

  const refreshMenu = () => {
    getMenuData();
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabItem = (date) => {
    const day = getDayOfWeek(date);
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" mb={1}>
          {day}
        </Typography>
        <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
          {formatDateToString(date)}
        </Typography>
      </Box>
    );
  };

  // Handle scrolling to the previous set of tabs
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - tabsPerPage));
    setSelectedTab(CalculateActiveTab);
    console.log(startIndex);
  };

  // Handle scrolling to the next set of tabs
  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(dailyMenu.length - tabsPerPage, prev + tabsPerPage)
    );
    console.log(startIndex);

    setSelectedTab(0);
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
      {!loading ? (
        dailyMenu.length > 0 ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton onClick={handlePrev} disabled={startIndex === 0}>
                <ChevronLeft />
              </IconButton>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {dailyMenu
                  .slice(startIndex, startIndex + tabsPerPage)
                  .map((menuItem, index) => (
                    <Tab
                      key={index + startIndex}
                      label={tabItem(menuItem.date)}
                    />
                  ))}
              </Tabs>
              <IconButton
                onClick={handleNext}
                disabled={startIndex + tabsPerPage >= dailyMenu.length}
              >
                <ChevronRight />
              </IconButton>
            </Box>
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
          </>
        ) : (
          <Box backgroundColor="white" p={3}>
            <Typography variant="h5">
              Menu not uploaded for the week.
            </Typography>
          </Box>
        )
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
      <UploadMenuForm
        open={open}
        handleClose={handleClose}
        refreshMenu={refreshMenu}
      />
    </Box>
  );
};

export default MenuPage;
