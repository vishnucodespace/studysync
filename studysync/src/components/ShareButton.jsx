// src/components/ShareButton.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Share, ShareOutlined } from '@mui/icons-material';

function ShareButton() {
  const [shared, setShared] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={shared ? 'contained' : 'outlined'}
        onClick={() => setShared(!shared)}
        sx={{
          borderRadius: 2,
          py: 0.5,
          px: 2,
          fontWeight: 'bold',
          color: shared ? '#E2E8F0' : '#00D4FF',
          background: shared
            ? 'linear-gradient(45deg, #6B48FF, #00D4FF)' // Filled gradient when shared
            : 'transparent',
          borderColor: '#00D4FF', // Cyan border when outlined
          '&:hover': {
            boxShadow: shared
              ? '0 0 15px rgba(0, 212, 255, 0.5)'
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            borderColor: '#00D4FF',
            background: shared
              ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
              : 'rgba(0, 212, 255, 0.1)', // Subtle hover fill
          },
          ml: 1, // Margin-left to space from LikeButton
        }}
      >
        {shared ? <Share sx={{ mr: 1 }} /> : <ShareOutlined sx={{ mr: 1 }} />}
        {shared ? 'Shared' : 'Share'}
      </Button>
    </motion.div>
  );
}

export default ShareButton;