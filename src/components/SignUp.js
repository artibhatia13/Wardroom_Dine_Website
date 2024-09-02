import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/firestoreUtility";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    const response = await signUp(formData);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
      });
      navigate("/signin");
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
          Register
        </Typography>
        <Typography
          variant="subtitle1"
          color="customColors.grey.dark"
          sx={{ fontWeight: 400 }}
        >
          Create a new Unit
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
            label="Unit Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ "& .MuiTextField-root": { borderRadius: "40px" } }}
          />
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
            Sign Up
          </Button>
          <Box sx={{ textAlign: "center", marginTop: "-10px" }}>
            <Typography
              component="span"
              color="customColors.grey.dark"
              sx={{ fontSize: "12px" }}
            >
              Already have an account?{" "}
            </Typography>
            <Link href="/signin" underline="always" sx={{ fontSize: "12px" }}>
              Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </WelcomePage>
  );
};

export default SignUp;
