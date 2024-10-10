
import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const UserLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/admin/login', { username, password });
      const { token } = res.data;
      const userData = { username, role: 'admin' };
      login(token, userData);
      setLoading(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          User Login
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            value={username}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UserLogin;
