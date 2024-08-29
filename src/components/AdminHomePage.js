import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Feedback from "./Feedback";

const AdminHomePage = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="0.75" px={8} py={6}>
        {children}
      </Box>
    </Box>
  );
};

export default AdminHomePage;
