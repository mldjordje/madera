"use client";

import React from 'react';
import { Fab } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const MobileCallButton = () => {
  return (
    <Fab
      color="primary"
      aria-label="call"
      href="tel:+381607180659"
      sx={{
        display: { xs: 'flex', md: 'none' }, // Visible on mobile/tablet, hidden on desktop
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <PhoneIcon />
    </Fab>
  );
};

export default MobileCallButton;
