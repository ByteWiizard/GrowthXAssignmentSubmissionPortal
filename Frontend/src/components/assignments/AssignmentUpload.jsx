// src/components/Assignments/AssignmentUpload.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
} from '@mui/material';

const AssignmentUpload = () => {
  const [task, setTask] = useState('');
  const [adminId, setAdminId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get('/user/admins');
        setAdmins(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmins();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/upload', { task, adminId });
      setSuccessMessage('Assignment uploaded successfully.');
      setTask('');
      setAdminId('');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        sx={{
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Upload Assignment
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            label="Task"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            select
            label="Select Admin"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            fullWidth
            required
            margin="normal"
          >
            {admins.map((admin) => (
              <MenuItem key={admin._id} value={admin._id}>
                {admin.username}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AssignmentUpload;
