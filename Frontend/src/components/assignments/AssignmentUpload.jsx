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
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const AssignmentUpload = () => {
  const [task, setTask] = useState('');
  const [adminId, setAdminId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [file, setFile] = useState(null);
  const [submitAsFile, setSubmitAsFile] = useState(false);

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
    if (!adminId) {
      setErrorMessage('Please select an admin');
      return;
    }
    if(adminId){
      console.log("admin motherfucker",adminId);
    }
    if (!task && !file) {
      setErrorMessage('Please provide a task or upload a file');
      return;
    }
    try {
      const formData = new FormData();
      
      if (submitAsFile && file) {
        formData.append('file', file);
        formData.append('adminId', adminId);
      } else {
        
        formData.append('adminId', adminId);
        formData.append('task', task);
      }
      await axios.post('/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Assignment uploaded successfully.');
      setTask('');
      setAdminId('');
      setFile(null);
      setSubmitAsFile(false);
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
          Submit Assignment
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

          <FormControlLabel
            control={
              <Checkbox
                checked={submitAsFile}
                onChange={(e) => setSubmitAsFile(e.target.checked)}
                color="primary"
              />
            }
            label="Submit as PDF"
          />

          {submitAsFile ? (
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              {file ? 'Change File' : 'Upload PDF'}
              <input
                type="file"
                name='file'
                accept="application/pdf"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          ) : (
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
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AssignmentUpload;
