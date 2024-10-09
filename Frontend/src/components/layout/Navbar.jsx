// src/components/Layout/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: '#fff', textDecoration: 'none' }}>
          Assignment Portal
        </Typography>
        {auth.isAuthenticated ? (
          <>
            {auth.user.role === 'user' && (
              <Button color="inherit" component={Link} to="/user/dashboard">
                Dashboard
              </Button>
            )}
            {auth.user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin/dashboard">
                Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/user/login">
              User Login
            </Button>
            <Button color="inherit" component={Link} to="/admin/login">
              Admin Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
