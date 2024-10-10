// src/components/Assignments/AssignmentList.js

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
  Button,
  Link,
} from '@mui/material';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('/admin/assignments');
      setAssignments(res.data);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to fetch assignments.');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.post(`/admin/assignments/${id}/${action}`);
      fetchAssignments();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Action failed.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Assignments
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
              <TableCell>User</TableCell>
              <TableCell>Submission</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>{assignment.userId.username}</TableCell>
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
                <TableCell>{assignment.status}</TableCell>
                <TableCell>{new Date(assignment.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">
                  {assignment.status === 'pending' ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleAction(assignment._id, 'accept')}
                        sx={{ mr: 1 }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleAction(assignment._id, 'reject')}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Typography variant="body2">{assignment.status}</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {assignments.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No assignments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AssignmentList;
