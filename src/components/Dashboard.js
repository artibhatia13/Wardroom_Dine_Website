import React from "react";
import {
  Typography,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const dummyData = [
  {
    name: "John Doe",
    preference: "Veg",
    breakfast: 5,
    lunch: 3,
    dinner: 2,
  },
  {
    name: "Jane Smith",
    preference: "Non-Veg",
    breakfast: 4,
    lunch: 6,
    dinner: 5,
  },
  {
    name: "Alice Johnson",
    preference: "Veg",
    breakfast: 7,
    lunch: 2,
    dinner: 4,
  },
];

const Dashboard = () => {
  return (
    <Box py={6}>
      <Box>
        <Box
          display="flex"
          padding={5}
          //paddingBottom={10}
          //height={10}
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
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Total Count
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              256
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Veg
            </Typography>
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
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Non Veg
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#FF4614" }}
            >
              82
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Detailed Section */}
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Preference
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Breakfast
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Lunch
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Dinner
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.preference}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.breakfast}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.lunch}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.dinner}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
