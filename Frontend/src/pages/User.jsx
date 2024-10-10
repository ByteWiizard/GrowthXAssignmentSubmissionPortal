import React from 'react';
import { Box } from '@mui/material';
import AssignmentUpload from '../components/assignments/AssignmentUpload';
import UserAssignmentList from '../components/assignments/UserAssignmentList';
const UserDashboard = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <AssignmentUpload />
      <Box sx={{ mt: 4 }}>
        <UserAssignmentList />
      </Box>
    </Box>
  );
};

export default UserDashboard;
