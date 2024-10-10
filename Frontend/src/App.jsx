// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import UserRegister from './components/Auth/register/UserRegisteration';
import UserLogin from './components/Auth/login/UserLogin';
import AdminRegister from './components/Auth/register/AdminRegistration';
import AdminLogin from './components/Auth/login/AdminLogin';
import UserDashboard from './pages/User';
import AdminDashboard from './pages/Admin';
import Home from './pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App = () => {
  return (
 
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
   
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
