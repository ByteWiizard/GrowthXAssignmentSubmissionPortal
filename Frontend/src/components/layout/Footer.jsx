// src/components/Layout/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: '#fff',
        py: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} GrowthX Assignment Portal. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
