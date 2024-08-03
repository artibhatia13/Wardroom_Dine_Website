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
        maxWidth={1500}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Wrapper;
