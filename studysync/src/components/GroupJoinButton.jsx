// src/components/GroupJoinButton.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { GroupAdd, Check } from '@mui/icons-material';

function GroupJoinButton() {
  const [joined, setJoined] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={joined ? 'contained' : 'outlined'}
        onClick={() => setJoined(!joined)}
        sx={{
          borderRadius: 2,
          py: 1,
          px: 2,
          fontWeight: 'bold',
          color: joined ? '#E2E8F0' : '#00D4FF',
          background: joined
            ? 'linear-gradient(45deg, #6B48FF, #00D4FF)' // Filled gradient when joined
            : 'transparent',
          borderColor: '#00D4FF', // Cyan border when outlined
          '&:hover': {
            boxShadow: joined
              ? '0 0 15px rgba(0, 212, 255, 0.5)'
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            borderColor: '#00D4FF',
            background: joined
              ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
              : 'rgba(0, 212, 255, 0.1)', // Subtle hover fill
          },
        }}
      >
        {joined ? <Check sx={{ mr: 1 }} /> : <GroupAdd sx={{ mr: 1 }} />}
        {joined ? 'Joined' : 'Join Group'}
      </Button>
    </motion.div>
  );
}

export default GroupJoinButton;