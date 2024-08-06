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

            <Route path="/dashboard" element={<AdminHomePage />} />
            {/* <Route path="/view-menu" element={<Menu />} /> */}
          </Routes>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
