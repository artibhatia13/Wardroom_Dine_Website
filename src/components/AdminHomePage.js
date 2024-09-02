import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHomePage = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box
        flex="0.75"
        px={8}
        sx={{
          overflowY: "scroll",
          height: "100vh",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {children}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AdminHomePage;
