import React, { useState, useEffect } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import { formatDate, formatDateToString } from "../services/utility";
import { fetchTodaysMenu } from "../services/firestoreUtility";
import { useUnitContext } from "../context/unitContext";

const Headcount = () => {
  const [todaysMenu, setTodaysMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unit } = useUnitContext();

  const getTodaysMenu = async () => {
    setLoading(true);
    const today = formatDate(new Date());
    const response = await fetchTodaysMenu(unit.id, today);
    if (response.success) setTodaysMenu(response.data);
    else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodaysMenu();
  }, []);

  return (
    <Box py={6}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">See Who's Coming,</Typography>
        <Typography variant="h3" sx={{ fontWeight: "600" }} mt={1}>
          Cook Just the Right Amount!
        </Typography>
      </Box>
      {loading ? (
        <>
          <Box display="flex" flexDirection="column" gap={2} mt={6}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="80%"
                height="180px"
              />
            ))}
          </Box>
        </>
      ) : todaysMenu ? (
        <Box mt={6}>
          <Box
            display="flex"
            py={1}
            width="80%"
            justifyContent="space-around"
            alignItems="center"
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ textTransform: "uppercase" }} mt={1}>
              {formatDateToString(todaysMenu.date)}
            </Typography>
          </Box>
          <MealBox
            mealType="Breakfast"
            vegCount={todaysMenu.breakfast_count.veg}
            nonVegCount={todaysMenu.breakfast_count.non_veg}
          />
          <MealBox
            mealType="Lunch"
            vegCount={todaysMenu.lunch_count.veg}
            nonVegCount={todaysMenu.lunch_count.non_veg}
          />
          <MealBox
            mealType="Dinner"
            vegCount={todaysMenu.dinner_count.veg}
            nonVegCount={todaysMenu.dinner_count.non_veg}
          />
        </Box>
      ) : (
        <Box backgroundColor="white" mt={8} p={4}>
          <Typography variant="h5">No Menu Uploaded for Today.</Typography>
        </Box>
      )}
    </Box>
  );
};

const MealBox = ({ mealType, vegCount, nonVegCount }) => (
  <Box
    display="flex"
    py={5}
    width="80%"
    justifyContent="space-around"
    alignItems="center"
    sx={{
      backgroundColor: "white",
      borderRadius: "12px",
      mb: 2,
    }}
  >
    <Typography variant="h5">{mealType}:</Typography>
    <Box display="flex" gap={6}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "#7CDC81",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "600", color: "white" }}>
          {vegCount}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "400" }} mt="3px">
          Veg
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "#FF714B",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "600", color: "white" }}>
          {nonVegCount}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "400" }} mt="3px">
          Non Veg
        </Typography>
      </Box>
    </Box>
  </Box>
);

export default Headcount;
