

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from '@mui/material';

const UserAssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('/user/assignments');
      setAssignments(res.data);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to fetch assignments.');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Your Submissions
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>
                  {assignment.task ? (
                    assignment.task
                  ) : assignment.fileUrl ? (
                    <Link
                      href={`http://localhost:5000/${assignment.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {assignment.fileName}
                    </Link>
                  ) : (
                    'No submission'
                  )}
                </TableCell>
                <TableCell>{assignment.adminId?.username || 'N/A'}</TableCell>
                <TableCell>{assignment.status}</TableCell>
                <TableCell>{new Date(assignment.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {assignments.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  You have not submitted any assignments.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserAssignmentList;
