<<<<<<< HEAD
import React from "react";
import { Typography, Box } from "@mui/material";
//import { CenterFocusStrong } from "@mui/icons-material";
=======
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
} from "@mui/material"; // Added missing imports
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import db from "../config/firestore";
>>>>>>> 53aa8d59e51597429de608aa3a622a1df3162845

const Dashboard = () => {
  return (
    <Box>
      <Box>
        <Box
          display="flex"
          padding={6}
          paddingBottom={10}
          height={10}
          justifyContent="space-around"
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            mb: 4,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2">Total Count</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              256
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2">Veg</Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#6BBE6F" }}
            >
              174
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2">Non Veg</Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#FF4614" }}
            >
              82
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Arrange columns horizontally
          flexWrap: "wrap", // Allow wrapping if needed
          height: "395px", // Height of the rectangular box
          backgroundColor: "white", // Color of the rectangular box
          borderRadius: "8px",
          marginTop: "20px", // Space between white box and rectangular box
          // border: "1px solid black", // Border around the entire rectangular box
          boxSizing: "border-box", // Include border in element's total width and height
        }}
      >
        {/* New Row */}
        <Box
          sx={{
            position: "absolute",
            width: "865px", // Ensure row spans full width of parent container
            height: "60px", // Set the height of the row to 10px
            backgroundColor: "#white", // Background color for the row (optional)
            borderBottom: "1px solid #B4B4B4", // Border at the bottom of the row
            boxSizing: "border-box", // Include border in element's total width and height
            //zIndex: 1,
          }}
        >
          {/* Content for Row (e.g., a header or controls) */}
        </Box>

        {/* Column 1 */}

        <Box
          sx={{
            flex: "2",
            borderRight: "0.5px solid #B4B4B4", // Right border for separation
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {/* Content for Column 1 */}
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
            }}
          >
            Name
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#FF4614" }}
          ></Typography>
        </Box>

        {/* Column 2 */}
        <Box
          sx={{
            flex: "1",
            borderRight: "0.5px solid #B4B4B4",
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {/* Content for Column 2 */}
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
            }}
          >
            Preference
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#FF4614" }}
          ></Typography>
        </Box>

        {/* Column 3 */}
        <Box
          sx={{
            flex: "1",
            borderRight: "0.5px solid #B4B4B4",
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {/* Content for Column 3 */}
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
            }}
          >
            Breakfast
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#FF4614" }}
          ></Typography>
        </Box>

        {/* Column 4 */}
        <Box
          sx={{
            flex: "1",
            borderRight: "0.5px solid #B4B4B4",
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {/* Content for Column 4 */}
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
            }}
          >
            Lunch
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#FF4614" }}
          ></Typography>
        </Box>

        {/* Column 5 */}
        <Box
          sx={{
            flex: "1",
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {/* Content for Column 5 */}
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
            }}
          >
            Dinner
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#FF4614" }}
          ></Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
