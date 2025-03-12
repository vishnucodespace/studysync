// src/components/LikeButton.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ThumbUp, ThumbUpAlt } from '@mui/icons-material';

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={liked ? 'contained' : 'outlined'}
        onClick={() => setLiked(!liked)}
        sx={{
          borderRadius: 2,
          py: 0.5,
          px: 2,
          fontWeight: 'bold',
          color: liked ? '#E2E8F0' : '#00D4FF',
          background: liked
            ? 'linear-gradient(45deg, #6B48FF, #00D4FF)' // Filled gradient when liked
            : 'transparent',
          borderColor: '#00D4FF', // Cyan border when outlined
          '&:hover': {
            boxShadow: liked
              ? '0 0 15px rgba(0, 212, 255, 0.5)'
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            borderColor: '#00D4FF',
            background: liked
              ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
              : 'rgba(0, 212, 255, 0.1)', // Subtle hover fill
          },
          mr: 1, // Kept your margin-right
        }}
      >
        {liked ? <ThumbUp sx={{ mr: 1 }} /> : <ThumbUpAlt sx={{ mr: 1 }} />}
        {liked ? 'Liked' : 'Like'}
      </Button>
    </motion.div>
  );
}

export default LikeButton;