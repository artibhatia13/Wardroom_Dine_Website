import React, { useEffect, useState } from "react";
import WelcomePage from "./WelcomePage";
import { TextField, Box, Typography, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/firestoreUtility";
import { toast } from "react-toastify";
import { useUnitContext } from "../context/unitContext";

const SignUp = () => {
  const { unit } = useUnitContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    unitID: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Perform validation
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    // Check password length
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      setIsLoading(false);
      return;
    } // Stop submission if form is invalid

    const response = await signUp(formData);
    console.log("response:", response);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right",
      });
      navigate("/sign-in");
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setIsLoading(false);
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
            disabled={isLoading}
          />

          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            disabled={isLoading}
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
            error={Boolean(errors.password)}
            helperText={errors.password}
            disabled={isLoading}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            loadingPosition="center"
            sx={{ mt: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Box sx={{ textAlign: "center", marginTop: "-10px" }}>
            <Typography
              component="span"
              color="customColors.grey.dark"
              sx={{ fontSize: "12px" }}
            >
              Already have an account?{" "}
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

export default SignUp;
