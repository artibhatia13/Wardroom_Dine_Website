import React from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import ThumbsUpDownRoundedIcon from "@mui/icons-material/ThumbsUpDownRounded";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useUnitContext } from "../context/unitContext";

const sidebarContent = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard/",
    icon: <DashboardRoundedIcon fontSize="medium" />,
  },
  {
    id: 2,
    name: "Headcount",
    link: "/dashboard/headcount",
    icon: <GroupsRoundedIcon fontSize="medium" />,
  },
  {
    id: 3,
    name: "Menu",
    link: "/dashboard/menu",
    icon: <OutboxRoundedIcon fontSize="medium" />,
  },
  {
    id: 4,
    name: "View Feedbacks",
    link: "/dashboard/feedbacks",
    icon: <ThumbsUpDownRoundedIcon fontSize="medium" />,
  },
  {
    id: 5,
    name: "Verify Users",
    link: "/dashboard/verifyuser",
    icon: <HowToRegIcon fontSize="medium" />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { unit } = useUnitContext();

  return (
    <Box
      flex="0.25"
      sx={{
        backgroundColor: "white",
        height: "100vh",
        borderRight: "1px solid #cfcfcf",
        borderLeft: "1px solid #cfcfcf",
      }}
    >
      <Box
        display="flex"
        px={3}
        height="70px"
        alignItems="center"
        color="primary.dark"
        sx={{ borderBottom: "1px solid #cfcfcf" }}
      >
        <Box sx={{ marginRight: "1rem" }}>
          <StorefrontIcon fontSize="large" />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          {unit.unit_name} wardroom
        </Typography>
      </Box>
      <Box mt={4}>
        {sidebarContent.map((item) => (
          <Link key={item.id} to={item.link} style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              alignItems="center"
              padding="1.5rem 3.5rem"
              sx={{
                borderRadius: "4px",
                backgroundColor:
                  location.pathname === item.link
                    ? "rgba(255, 92, 48, 0.16)"
                    : "inherit",
                color:
                  location.pathname === item.link
                    ? "customColors.black.main"
                    : "customColors.grey.main",
                "&:hover": {
                  color:
                    location.pathname === item.link
                      ? "customColors.black.main"
                      : "#5C5C5C",
                },
              }}
            >
              <Box sx={{ marginRight: "2rem" }}>{item.icon}</Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
