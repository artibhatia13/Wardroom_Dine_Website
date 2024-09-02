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
  Checkbox,
  Button,
} from "@mui/material";

const dummyData = [
  {
    fullName: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    fullName: "Jane Smith",
    phoneNumber: "987-654-3210",
    email: "jane.smith@example.com",
  },
  {
    fullName: "Alice Johnson",
    phoneNumber: "555-555-5555",
    email: "alice.johnson@example.com",
  },
];

export default function VerifyUser() {
  return (
    <>
      <Box py={2}>
        {" "}
        {/* Adjusted the padding to reduce space */}
        <Box
          display="flex"
          padding={5} // Reduced padding
          alignItems="center"
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            mb: 2, // Adjusted margin-bottom to reduce space between the title and the table
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "600" }}>
            Pending User Approvals
          </Typography>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Select
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Full Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Phone Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.fullName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.phoneNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "black", fontSize: "1.0rem" }}
                  >
                    {row.email}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        justifyContent="flex-end"
        mt={2} // Adjusted margin top for the button
        px={3} // Optional padding on the x-axis
      >
        <Button
          variant="contained"
          size="small"
          sx={{ height: "2.4rem" }}
          //onClick={handleOpen}
        >
          Approve
        </Button>
      </Box>
    </>
  );
}
