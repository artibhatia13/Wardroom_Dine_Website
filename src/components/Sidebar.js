import React from "react";
import { Typography, Box } from "@mui/material";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Drawer,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import ThumbsUpDownRoundedIcon from "@mui/icons-material/ThumbsUpDownRounded";

const Sidebar = () => {
  return (
    <Box
      flex="0.25"
      sx={{
        backgroundColor: "white",
        height: "100vh",
        borderRight: "1px solid #cfcfcf",
      }}
    >
      {/* <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    > */}
      <Box sx={{ margin: 2, padding: 1 }}></Box>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <GroupsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Headcount" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <OutboxRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Menu" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ThumbsUpDownRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      </List>
      {/* </Drawer> */}
    </Box>
  );
};

export default Sidebar;
