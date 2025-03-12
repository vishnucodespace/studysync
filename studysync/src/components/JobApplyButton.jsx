// src/components/JobApplyButton.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Work, Check } from '@mui/icons-material';

function JobApplyButton() {
  const [applied, setApplied] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={applied ? 'contained' : 'outlined'}
        onClick={() => setApplied(!applied)}
        sx={{
          borderRadius: 2,
          py: 1,
          px: 2,
          fontWeight: 'bold',
          color: applied ? '#E2E8F0' : '#00D4FF',
          background: applied
            ? 'linear-gradient(45deg, #6B48FF, #00D4FF)' // Filled gradient when applied
            : 'transparent',
          borderColor: '#00D4FF', // Cyan border when outlined
          '&:hover': {
            boxShadow: applied
              ? '0 0 15px rgba(0, 212, 255, 0.5)'
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            borderColor: '#00D4FF',
            background: applied
              ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
              : 'rgba(0, 212, 255, 0.1)', // Subtle hover fill
          },
        }}
      >
        {applied ? <Check sx={{ mr: 1 }} /> : <Work sx={{ mr: 1 }} />}
        {applied ? 'Applied' : 'Apply'}
      </Button>
    </motion.div>
  );
}

export default JobApplyButton;