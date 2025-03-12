// src/components/EventRSVPButton.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Event, Check } from '@mui/icons-material';

function EventRSVPButton() {
  const [rsvped, setRsvped] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={rsvped ? 'contained' : 'outlined'}
        onClick={() => setRsvped(!rsvped)}
        sx={{
          borderRadius: 2,
          py: 1,
          px: 2,
          fontWeight: 'bold',
          color: rsvped ? '#E2E8F0' : '#00D4FF',
          background: rsvped
            ? 'linear-gradient(45deg, #6B48FF, #00D4FF)' // Filled gradient when RSVP'd
            : 'transparent',
          borderColor: '#00D4FF', // Cyan border when outlined
          '&:hover': {
            boxShadow: rsvped
              ? '0 0 15px rgba(0, 212, 255, 0.5)'
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            borderColor: '#00D4FF',
            background: rsvped
              ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
              : 'rgba(0, 212, 255, 0.1)', // Subtle hover fill
          },
        }}
      >
        {rsvped ? <Check sx={{ mr: 1 }} /> : <Event sx={{ mr: 1 }} />}
        {rsvped ? 'RSVPed' : 'RSVP'}
      </Button>
    </motion.div>
  );
}

export default EventRSVPButton;