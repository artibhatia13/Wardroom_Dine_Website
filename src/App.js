// src/App.js

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Wrapper from "./components/Wrapper";
import appTheme from "./theme";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminHomePage from "./components/AdminHomePage";
import Dashboard from "./components/Dashboard";
import MenuPage from "./components/MenuPage";
import Headcount from "./components/Headcount";
import FeedbackPage from "./components/FeedbackPage";
import VerifyUserPage from "./components/VerifyUserPage";
import ForgotPassword from "./components/ForgotPassword";
import AuthRoute from "./components/AuthRoute";
import { UnitProvider } from "./context/unitContext";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Wrapper>
        <Router>
          <UnitProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/sign-up" />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Route */}
              <Route
                path="/dashboard/*"
                element={
                  <AuthRoute authRequired={true}>
                    <AdminHomePage>
                      <Routes>
                        <Route path="" element={<Dashboard />} />
                        <Route path="menu" element={<MenuPage />} />
                        <Route path="feedbacks" element={<FeedbackPage />} />
                        <Route path="headcount" element={<Headcount />} />
                        <Route path="verifyuser" element={<VerifyUserPage />} />
                      </Routes>
                    </AdminHomePage>
                  </AuthRoute>
                }
              />
            </Routes>
          </UnitProvider>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
