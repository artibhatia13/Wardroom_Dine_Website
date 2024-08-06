import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
} from "@mui/material"; // Added missing imports
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import db from "../config/firestore";

const Dashboard = () => {
  return (
    <Box flex="0.7">
      <Typography variant="h3">dashboard</Typography>
    </Box>
  );
};

export default Dashboard;
