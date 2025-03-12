// src/components/Comment.jsx
import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

function Comment({ comment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          ml: 2,
          mb: 1,
          p: 1,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.05)', // Subtle glassy night
          border: '1px solid rgba(107, 72, 255, 0.2)',
          '&:hover': { borderColor: '#00D4FF' },
        }}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            mr: 1,
            bgcolor: '#00D4FF', // Cyan avatar
            fontSize: '0.8rem',
          }}
        >
          {comment.author ? comment.author[0] : 'A'}
        </Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: '#E2E8F0', // Primary text
              fontWeight: 'bold',
            }}
          >
            {comment.author || 'Anonymous'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#A0AEC0', // Secondary text
            }}
          >
            {comment.text}
          </Typography>
          {comment.timestamp && (
            <Typography
              variant="caption"
              sx={{
                color: '#A0AEC0',
                opacity: 0.7,
              }}
            >
              {comment.timestamp}
            </Typography>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}

export default Comment;