// Wrapper.js
import React from "react";
import { Box } from "@mui/material";

const Wrapper = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
    >
      <Box
        maxWidth={1700}
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: "background.default",
          borderRight: "1px solid #cfcfcf",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
