import React, { useState } from "react";
import { useUnitContext } from "../context/unitContext";
import { LoadingButton } from "@mui/lab";
import { logoutUser } from "../services/firestoreUtility";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { unit } = useUnitContext();

  const handleLogOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await logoutUser();
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
      });
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      gap={2}
      height="70px"
      mx={-8}
      px={3}
      sx={{
        borderBottom: "1px solid #cfcfcf",
        backgroundColor: "white",
      }}
    >
      {/* <Button
        variant="outlined"
        sx={{
          height: "2.5rem",
          padding: "0 1.2rem",
          borderRadius: "12px",
          textTransform: "none",
        }}
      >
        UNIT ID: &nbsp;{unit.unit_id}
      </Button> */}
      <LoadingButton
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
        loadingPosition="start"
        sx={{
          height: "2.5rem",
          padding: "0 1.2rem 0 1.2rem",
          borderRadius: "12px",
        }}
        onClick={handleLogOut}
      >
        Log out
      </LoadingButton>
    </Box>
  );
};

export default Navbar;
