// Wrapper.js
import React from "react";
import { Box } from "@mui/material";

const Wrapper = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box
        maxWidth={1700}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
          boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
