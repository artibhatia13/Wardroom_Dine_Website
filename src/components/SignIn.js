import React from "react";
import { Box, Typography } from "@mui/material";
import WelcomePage from "./WelcomePage";

const SignUp = () => {
  return (
    <WelcomePage>
      <Box>
        <Typography variant="h2" color="primary.main">
          Welcome back
        </Typography>
      </Box>
    </WelcomePage>
  );
};

export default SignUp;
