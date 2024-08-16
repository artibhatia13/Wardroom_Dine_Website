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
import FeedbackPage from "./components/FeedbackPage";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Wrapper>
        <Router>
          {/* <Navigation /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<SignIn />} />

            <Route
              path="/dashboard/*"
              element={
                <AdminHomePage>
                  <Routes>
                    <Route path="" element={<Dashboard />} />
                    <Route path="menu" element={<MenuPage />} />
                    <Route path="feedback" element={<FeedbackPage />} />
                  </Routes>
                </AdminHomePage>
              }
            />
          </Routes>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
