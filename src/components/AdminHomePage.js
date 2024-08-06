import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
// import Dashboard from "./Dashboard";
import MenuPage from "./MenuPage";

const AdminHomePage = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="0.75" px={8} py={6}>
        <MenuPage />
      </Box>
    </Box>
  );
};

export default AdminHomePage;
