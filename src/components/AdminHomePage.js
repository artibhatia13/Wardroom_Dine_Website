import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const AdminHomePage = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="0.75" px={8} py={6}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default AdminHomePage;
