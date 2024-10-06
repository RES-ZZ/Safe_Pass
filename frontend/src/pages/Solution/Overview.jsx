import { useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Overview = ({ adminRequests, searchQuery, handleSearch }) => {
  // Filter requests based on the search query
  const filteredRequests = adminRequests.filter((request) =>
    request.userAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <TextField
        variant="outlined"
        label="Search User Address"
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.userAddress}</TableCell>
                <TableCell>
                  {request.approved ? (
                    "Approved"
                  ) : (
                    "Pending"
                  )}
                </TableCell>
                <TableCell>
                  {!request.approved && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => approveRegistration(index, request.userAddress, request.publicKey)}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Overview;
