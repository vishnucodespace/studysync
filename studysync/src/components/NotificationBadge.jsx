// src/components/NotificationBadge.jsx
import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion';

function NotificationBadge({ count }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <IconButton
        sx={{
          color: '#E2E8F0', // Light text for icon
          '&:hover': { color: '#00D4FF' }, // Cyan on hover
        }}
      >
        <Badge
          badgeContent={count}
          sx={{
            '& .MuiBadge-badge': {
              background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Gradient badge
              color: '#E2E8F0', // Light text in badge
              fontWeight: 'bold',
              border: '1px solid rgba(107, 72, 255, 0.5)',
              boxShadow: '0 0 8px rgba(0, 212, 255, 0.5)',
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </motion.div>
  );
}

export default NotificationBadge;