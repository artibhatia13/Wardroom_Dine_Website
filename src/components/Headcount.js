import React from "react";
import { Typography, Box } from "@mui/material";

// Reusable component for each meal section
const MealBox = ({ mealType, vegCount, nonVegCount }) => (
  <Box
    display="flex"
    padding={6}
    paddingBottom={10}
    height={35}
    justifyContent="space-around"
    sx={{
      backgroundColor: "white",
      borderRadius: "8px",
      mb: 2,
    }}
  >
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h5">{mealType}:</Typography>
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
        backgroundColor: "#7CDC81",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
        {vegCount}
      </Typography>
      <Typography variant="subtitle2">Veg</Typography>
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
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
        {nonVegCount}
      </Typography>
      <Typography variant="subtitle2">Non Veg</Typography>
    </Box>
  </Box>
);

const Headcount = () => {
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">See Who's Coming,</Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Cook Just the Right Amount!
        </Typography>
      </Box>

      <MealBox mealType="Breakfast" vegCount={174} nonVegCount={82} />
      <MealBox mealType="Lunch" vegCount={174} nonVegCount={82} />
      <MealBox mealType="Dinner" vegCount={174} nonVegCount={82} />
    </Box>
  );
};

export default Headcount;
