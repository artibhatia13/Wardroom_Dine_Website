import React, { useEffect, useState } from "react";
import { useUnitContext } from "../context/unitContext";
import { fetchPendingUserApprovals } from "../services/firestoreUtility";
import {
  Typography,
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { unit } = useUnitContext();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const getUsers = async (email) => {
    setLoading(true);
    const response = await fetchPendingUserApprovals(true, unit.id);
    if (response.success) {
      setUsers(response.data);
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <Box mt={6} mb={5}>
        <Box
          display="flex"
          padding={6}
          justifyContent="space-around"
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Total Count
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {unit.strength}
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Veg
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#6BBE6F" }}
            >
              {unit.veg_count}
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Non Veg
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#FF4614" }}
            >
              {unit.nonVeg_count}
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              mb="5px"
            >
              Ty-Dy/ Leave
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#ffca28 " }}
            >
              {unit.tydy.veg + unit.tydy.nonVeg}
            </Typography>
          </Box>
        </Box>
      </Box>

      {loading ? (
        <>
          <Box display="flex" flexDirection="column" gap={1}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height="90px"
              />
            ))}
          </Box>
        </>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Preference
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users ? (
                users.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "black", fontSize: "1.0rem" }}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "black", fontSize: "1.0rem" }}
                      >
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "black", fontSize: "1.0rem" }}
                      >
                        {row.phone}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color:
                            row.preference === "veg" ? "#6BBE6F" : "#FF4614",
                          fontSize: "1.0rem",
                          fontWeight: "bold",
                        }}
                      >
                        {row.preference}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "black", fontSize: "1.0rem" }}
                      >
                        {row.dinner}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Box backgroundColor="white" p={3}>
                  <Typography variant="h5">No Users Yet.</Typography>
                </Box>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
