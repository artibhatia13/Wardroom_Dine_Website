import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firestore";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import splash_screen from "../assests/splash_screen.json";
import { fetchUnitDataByEmail } from "../services/firestoreUtility";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const UnitContext = createContext();

export const useUnitContext = () => useContext(UnitContext);

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUnitData = async (email) => {
    setLoading(true);
    const response = await fetchUnitDataByEmail(email);
    if (response.success) setUnit(response.data);
    else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
    if (!location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchUnitData(user.email);
      else {
        setUnit(null);
        // navigate("/sign-in");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
      >
        <Lottie
          animationData={splash_screen}
          loop={true}
          style={{ height: "250px" }}
        />
      </Box>
    );
  } else {
    return (
      <UnitContext.Provider value={{ unit, setUnit }}>
        {children}
        <ToastContainer autoClose="1500" />
      </UnitContext.Provider>
    );
  }
};
