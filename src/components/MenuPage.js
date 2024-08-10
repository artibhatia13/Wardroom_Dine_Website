import React, { useEffect, useState } from "react";
import { Typography, Box, Tabs, Tab, Button } from "@mui/material"; // Added missing imports
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import db from "../config/firestore";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import MenuCard from "./MenuCard";

const MenuPage = () => {
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const docData = [
    {
      date: "10 Aug 24",
      day: "Sat",
      meals: {
        breakfast: [
          "bhaji",
          "paav",
          "sweet corn chat",
          "cold coffee/ milk",
          "fresh fruits",
        ],
        lunch: [
          "roti/ pulao",
          "palak paneer",
          "moong daal",
          "cold coffee/ milk",
          "aalo bhindi",
          "diplomatic pudding",
        ],
        dinner: [
          "roti/ rice",
          "paneer bhuji",
          "rajma daal",
          "cold coffee/ milk",
          "aalo baigan",
        ],
      },
    },
    {
      date: "11 Aug 24",
      day: "Sun",
      meals: {
        breakfast: [
          "bhaji",
          "paav",
          "sweet corn chat",
          "cold coffee/ milk",
          "fresh fruits",
        ],
        lunch: [
          "roti/ pulao",
          "palak paneer",
          "moong daal",
          "cold coffee/ milk",
          "aalo bhindi",
          "diplomatic pudding",
        ],
        dinner: [
          "roti/ rice",
          "paneer bhuji",
          "rajma daal",
          "cold coffee/ milk",
          "aalo baigan",
        ],
      },
    },
  ];

  const getMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "weekly_menu"));
    const weeklyMenu = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWeeklyMenu(weeklyMenu[0]?.menu_list || []); // Added optional chaining and default empty array
    console.log("weekly menu", weeklyMenu);
  };

  const uploadMenu = async () => {
    console.log("inside func");
    const unitId = "Xu0rDXPoC4BGxd6T1mFY";
    try {
      const q = query(
        collection(db, "weekly_menu"),
        where("unit_id", "==", unitId)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      querySnapshot.forEach(async (doc) => {
        // Update the menu_list field by appending new data
        await updateDoc(doc.ref, {
          menu_list: arrayUnion(...docData),
        });
      });

      console.log("Menu list updated successfully!");
    } catch (error) {
      console.error("Error updating menu list: ", error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const refreshMenu = () => {
    getMenu();
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

  return (
    <Box>
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
        >
          Upload Menu
        </Button>
      </Box>
      {weeklyMenu.length > 0 ? (
        <>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            // variant="scrollable"
            variant="fullWidth"
            scrollButtons="auto"
          >
            {weeklyMenu.map((menuItem, index) => (
              <Tab key={index} label={tabItem(menuItem.day, menuItem.date)} />
            ))}
          </Tabs>
          {weeklyMenu.map((menuItem, index) => (
            <Box key={index} hidden={selectedTab !== index} mt={6}>
              <Box display="flex" gap={4} justifyContent="center">
                <MenuCard
                  mealName="breakfast"
                  mealItems={menuItem.meals.breakfast}
                  mealImage="/images/breakfast.jpg"
                  mealDate={menuItem.date}
                  refreshMenu={refreshMenu}
                />
                <MenuCard
                  mealName="lunch"
                  mealItems={menuItem.meals.lunch}
                  mealImage="/images/lunch.jpg"
                  mealDate={menuItem.date}
                  refreshMenu={refreshMenu}
                />
                <MenuCard
                  mealName="dinner"
                  mealItems={menuItem.meals.dinner}
                  mealImage="/images/dinner.jpg"
                  mealDate={menuItem.date}
                  refreshMenu={refreshMenu}
                />
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Typography variant="subtitle1">Loading...</Typography>
      )}
    </Box>
  );
};

export default MenuPage;
