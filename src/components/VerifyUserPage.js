import React, { useEffect, useState } from "react";
import { useUnitContext } from "../context/unitContext";
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
  Checkbox,
  Skeleton,
} from "@mui/material";
import {
  approveUserRequest,
  fetchPendingUserApprovals,
} from "../services/firestoreUtility";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

export default function VerifyUser() {
  const [loading, setLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]); // State to keep track of selected users
  const { unit } = useUnitContext();

  const getPendingRequest = async () => {
    setLoading(true);
    const response = await fetchPendingUserApprovals(false, unit.id);
    if (response.success) {
      setPendingRequests(response.data);
    } else {
      toast.error(response.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getPendingRequest();
  }, []);

  const handleCheckboxChange = (userID) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userID)
        ? prevSelected.filter((id) => id !== userID)
        : [...prevSelected, userID]
    );
  };

  const approveUsers = async () => {
    setIsApproving(true);
    for (const userID of selectedUsers) {
      const response = await approveUserRequest(userID);
      if (response.success) {
        toast.success(`Approved ${userID}`, {
          position: "top-right",
          autoClose: "900",
        });
      } else {
        toast.error(`Failed to approve ${userID}: ${response.message}`, {
          position: "top-right",
          autoClose: "900",
        });
      }
    }
    setIsApproving(false);
    // Refresh pending requests after approval
    getPendingRequest();
  };

  return (
    <>
      <Box py={6}>
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          Pending User Approvals
        </Typography>
      </Box>
      {loading ? (
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
      ) : pendingRequests ? (
        <>
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Select
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Full Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Phone Number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Email
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                      />
                    </TableCell>
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
                        {row.phone}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="flex-end" mt={2} px={3}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isApproving}
              loadingPosition="start"
              size="small"
              sx={{ height: "2.4rem" }}
              onClick={approveUsers}
              disabled={selectedUsers.length === 0} // Disable if no users are selected
            >
              Approve
            </LoadingButton>
          </Box>
        </>
      ) : (
        <Box backgroundColor="white" p={3}>
          <Typography variant="h5">No Pending Requests.</Typography>
        </Box>
      )}
    </>
  );
}
