// src/pages/Home.js
import React, { useState } from 'react';
import { Container, Box, Tabs, Tab, Paper } from '@mui/material';
import UserRegister from '../components/Auth/register/UserRegisteration';
import AdminRegister from '../components/Auth/register/AdminRegistration';
import UserLogin from '../components/Auth/login/UserLogin';
import AdminLogin from '../components/Auth/login/AdminLogin';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="User Registeration" />
          <Tab label="Admin Registeration" />
          <Tab label="User Login" />
          <Tab label="Admin Login" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <UserRegister />}
            {activeTab === 1 && <AdminRegister />}
          {activeTab === 2 && <UserLogin />}
          {activeTab === 3 && <AdminLogin />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
