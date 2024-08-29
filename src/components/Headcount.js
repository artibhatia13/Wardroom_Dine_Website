import React, { useState, useEffect } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { fetchUnitData } from "../services/firestoreUtility";
import { toast } from "react-toastify";

// Reusable component for each meal section
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

const Headcount = () => {
  const [headcounts, setHeadcounts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getHeadcount = async () => {
    const unitId = "Xu0rDXPoC4BGxd6T1mFY";
    setLoading(true);
    const unitData = await fetchUnitData(unitId);

    if (unitData) {
      console.log("Unit Data:", unitData);
      setHeadcounts(unitData);
    } else {
      console.error("Failed to fetch unit data.");
      toast.error("Some error occured", {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getHeadcount();
  }, []);

  return (
    <Box py={6}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">See Who's Coming,</Typography>
        <Typography variant="h3" sx={{ fontWeight: "600" }} mt={1}>
          Cook Just the Right Amount!
        </Typography>
      </Box>
      {loading || headcounts.length <= 0 ? (
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
      ) : (
        <Box mt={6}>
          <MealBox
            mealType="Breakfast"
            vegCount={headcounts.breakfast_count.veg}
            nonVegCount={headcounts.breakfast_count.non_veg}
          />
          <MealBox
            mealType="Lunch"
            vegCount={headcounts.lunch_count.veg}
            nonVegCount={headcounts.lunch_count.non_veg}
          />
          <MealBox
            mealType="Dinner"
            vegCount={headcounts.dinner_count.veg}
            nonVegCount={headcounts.dinner_count.non_veg}
          />
        </Box>
      )}
    </Box>
  );
};

export default Headcount;
