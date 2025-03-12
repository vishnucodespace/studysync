// src/components/Post.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

function Post({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
          background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
          border: '2px solid rgba(107, 72, 255, 0.2)',
          '&:hover': {
            borderColor: '#00D4FF',
            boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              color: '#00D4FF', // Cyan username
              fontWeight: 'bold',
            }}
          >
            {post.user.name}
          </Typography>
          <Typography
            sx={{
              color: '#E2E8F0', // Light content text
              mb: 2,
            }}
          >
            {post.content}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LikeButton />
            <ShareButton />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Post;