import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const AdminHomePage = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Dashboard />
    </Box>
  );
};

export default AdminHomePage;
