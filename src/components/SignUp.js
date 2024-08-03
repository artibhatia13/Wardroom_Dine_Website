import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted", formData);
    navigate("/dashboard");
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
          sx={{ fontWeight: 500 }}
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
            label="Username"
            name="username"
            value={formData.username}
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
        </Box>
      </Box>
    </WelcomePage>
  );
};

export default SignUp;
