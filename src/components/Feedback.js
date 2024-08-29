import React from "react";
import { Typography, Box } from "@mui/material";

// Reusable FeedbackItem component
const FeedbackItem = ({ date, mealType, feedback }) => (
  <Box
    display="flex"
    padding={6}
    paddingBottom={10}
    justifyContent="space-around"
    sx={{
      flexDirection: "column",
      backgroundColor: "white",
      borderRadius: "8px",
      mb: 2,
    }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        color: "#FF5C30",
        width: "100%",
      }}
    >
      <Typography variant="subtitle2">{date}</Typography>
      <Typography variant="subtitle2">{mealType}</Typography>
    </Box>

    <Box
      sx={{
        textAlign: "justify",
        mt: 2,
      }}
    >
      <Typography variant="subtitle2">{feedback}</Typography>
    </Box>
  </Box>
);

const Feedback = () => {
  const feedbackData = [
    {
      date: "05 AUG 24",
      mealType: "Breakfast",
      feedback:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      date: "05 AUG 24",
      mealType: "Lunch",
      feedback:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      date: "05 AUG 24",
      mealType: "Dinner",
      feedback:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <Box sx={{ overflowY: "scroll", height: "100vh" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Customer Insights
        </Typography>
        <Typography variant="h6">
          Use feedback to review your recipes
        </Typography>
      </Box>

      {feedbackData.map((item, index) => (
        <FeedbackItem
          key={index}
          date={item.date}
          mealType={item.mealType}
          feedback={item.feedback}
        />
      ))}
    </Box>
  );
};

export default Feedback;
