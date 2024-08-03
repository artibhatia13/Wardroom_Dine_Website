import React from "react";
import { Box, Typography } from "@mui/material";

const WelcomePage = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(/images/backgroundImage.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />
      <Box
        display="flex"
        sx={{
          color: "#fff",
          position: "relative",
          zIndex: 2,
          height: "100%",
        }}
      >
        <Box
          flex="0.6"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                mt: "-3rem",
              }}
            >
              Data-Driven Dining:
            </Typography>
            <Typography variant="h1" mt={6}>
              Cook Smart, Serve Better!
            </Typography>
            <Typography variant="h4" mt={2}>
              Get real-time headcounts & feedback
            </Typography>
          </Box>
        </Box>
        <Box
          flex="0.4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          sx={{
            backgroundColor: "background.default",
            color: "customColors.black.main",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
