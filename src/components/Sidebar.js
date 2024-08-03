import React from "react";
import { Typography, Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      flex="0.3"
      sx={{
        backgroundColor: "white",
        height: "100vh",
        borderRight: "1px solid #cfcfcf",
      }}
    >
      <Typography variant="h4">sidebar</Typography>
    </Box>
  );
};

export default Sidebar;
