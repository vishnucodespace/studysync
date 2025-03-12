// src/components/ConnectionRequestButton.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { PersonAdd, Check } from '@mui/icons-material';

function ConnectionRequestButton() {
  const [requested, setRequested] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={requested ? 'contained' : 'outlined'}
        onClick={() => setRequested(!requested)}
        sx={{
          borderRadius: 2,
          py: 1,
          px: 2,
          fontWeight: 'bold',
          color: requested ? '#E2E8F0' : '#00D4FF',
          background: requested
            ? 'linear-gradient(45deg, #6B48FF, #00D4FF)' // Filled gradient when requested
            : 'transparent',
          borderColor: '#00D4FF', // Cyan border when outlined
          '&:hover': {
            boxShadow: requested
              ? '0 0 15px rgba(0, 212, 255, 0.5)'
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            borderColor: '#00D4FF',
            background: requested
              ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
              : 'rgba(0, 212, 255, 0.1)', // Subtle hover fill
          },
        }}
      >
        {requested ? <Check sx={{ mr: 1 }} /> : <PersonAdd sx={{ mr: 1 }} />}
        {requested ? 'Requested' : 'Connect'}
      </Button>
    </motion.div>
  );
}

export default ConnectionRequestButton;