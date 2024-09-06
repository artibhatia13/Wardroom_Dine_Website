import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import { LoadingButton } from "@mui/lab";
import { TextField, Box, Typography, Link } from "@mui/material";
import { resetPassword } from "../services/firestoreUtility";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await resetPassword(email);
    console.log("response:", response);
    if (response.success) {
      toast.info(response.message, {
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
    <WelcomePage>
      <Box width="70%">
        <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>
          Forgot Password?
        </Typography>
        <Typography
          variant="subtitle1"
          color="customColors.grey.dark"
          sx={{ fontWeight: 400 }}
          mt={1}
        >
          Enter your email to receive a password reset link
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            disabled={loading}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={loading}
            loadingPosition="center"
            sx={{ mt: 1 }}
          >
            Reset Password
          </LoadingButton>
          <Box sx={{ textAlign: "center", marginTop: "-10px" }}>
            <Typography
              component="span"
              color="customColors.grey.dark"
              sx={{ fontSize: "12px" }}
            >
              Go to{" "}
            </Typography>
            <Link href="/sign-in" underline="always" sx={{ fontSize: "12px" }}>
              Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </WelcomePage>
  );
};

export default ForgotPassword;
