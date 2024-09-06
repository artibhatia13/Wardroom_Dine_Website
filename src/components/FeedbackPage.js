import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Skeleton,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import { fetchFeedbacks } from "../services/firestoreUtility";
import { formatDateToString } from "../services/utility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useUnitContext } from "../context/unitContext";
import { toast } from "react-toastify";

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState(null);
  const { unit } = useUnitContext();

  const getFeedbacks = async () => {
    setLoading(true);
    const response = await fetchFeedbacks(unit.id);
    if (response.success) setFeedbacks(response.data);
    else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <Box py={6}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          Customer Insights
        </Typography>
        <Typography variant="h5" mt={1}>
          Use feedback to review your recipes
        </Typography>
      </Box>

      {loading ? (
        <>
          <Box display="flex" flexDirection="column" gap={3} mt={6}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="85%"
                height="170px"
              />
            ))}
          </Box>
        </>
      ) : feedbacks ? (
        <Box mt={6}>
          {feedbacks.map((item) => (
            <FeedbackItem
              key={item.id}
              date={item.date}
              mealType={item.meal_name}
              feedback={item.feedback}
              userName={item.user_name}
              menuItem={item.menu_item}
            />
          ))}
        </Box>
      ) : (
        <Box backgroundColor="white" p={3} mt={6}>
          <Typography variant="h5">No Feedbacks Yet.</Typography>
        </Box>
      )}
    </Box>
  );
};

const FeedbackItem = ({ date, mealType, feedback, userName, menuItem }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      pt={3}
      pb={5}
      px={4}
      mb={3}
      justifyContent="space-around"
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
      }}
      width="80%"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          color: "#FF5C30",
          width: "100%",
        }}
      >
        <Typography variant="subtitle2">{formatDateToString(date)}</Typography>
        <Box
          display="flex"
          alignItems="center"
          onClick={handleClick}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography
            variant="subtitle2"
            mr={1}
            sx={{
              textTransform: "capitalize",
            }}
          >
            {mealType}
          </Typography>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {menuItem.map((item, index) => (
            <>
              <MenuItem
                onClick={handleClose}
                key={index}
                sx={{
                  fontSize: "12px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "default",
                  },
                  "&.MuiMenuItem-root": {
                    padding: "4px 24px",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent !important",
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                {item}
              </MenuItem>
              {index !== menuItem.length - 1 && <Divider />}
            </>
          ))}
        </Menu>
      </Box>

      <Box
        sx={{
          textAlign: "justify",
          mt: 2,
        }}
      >
        <Typography variant="body1">{feedback}</Typography>
      </Box>
      <Box sx={{ textAlign: "end" }}>
        <Typography variant="subtitle2">-- {userName}</Typography>
      </Box>
    </Box>
  );
};

export default Feedback;
