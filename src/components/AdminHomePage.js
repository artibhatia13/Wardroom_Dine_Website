import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminHomePage = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />

      <Box flex="0.75" px={8}>
        <Navbar />
        <Box
          sx={{
            overflowY: "scroll",
            height: "calc(100vh - 80px)",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHomePage;
