// src/pages/UserDashboard.js
import React from 'react';
import AssignmentUpload from '../components/assignments/AssignmentUpload';

const UserDashboard = () => {
  return (
    <div>
      <AssignmentUpload />
      {/* You can also display user's assignments here */}
    </div>
  );
};

export default UserDashboard;
