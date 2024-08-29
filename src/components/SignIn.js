import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/firestoreUtility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signIn(formData.email, formData.password);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
      });
      navigate("/dashboard/");
    } else {
      toast.error(`Error:${response.message}`, {
        position: "top-right",
      });
      navigate("/dashboard/");
    }
  };

  return (
    <WelcomePage>
      <Box width="70%">
        <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          color="customColors.grey.dark"
          sx={{ fontWeight: 400 }}
        >
          Login to your account
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
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Link
            href="/forgot-password"
            underline="always"
            sx={{ textAlign: "end", marginTop: "-10px" }}
          >
            Forgot password?
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: "center", marginTop: "-10px" }}>
            <Typography
              component="span"
              color="customColors.grey.dark"
              sx={{ fontSize: "12px" }}
            >
              Don't have an account?{" "}
            </Typography>
            <Link href="/signup" underline="always" sx={{ fontSize: "12px" }}>
              Sign Up
            </Link>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </WelcomePage>
  );
};

export default SignIn;
