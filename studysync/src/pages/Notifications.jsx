// src/pages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch notifications from backend
    setNotifications([
      { id: 1, message: 'Jane liked your post.', timestamp: '5 mins ago', type: 'like' },
      { id: 2, message: 'New event added: College Fest.', timestamp: '1 hr ago', type: 'event' },
    ]);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #4caf50, #81c784)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Notifications
        </Typography>

        {/* Notification List */}
        <Box>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: notification.id * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  background: 'white',
                  border: '2px solid #e0e0e0',
                  mb: 2,
                  '&:hover': {
                    borderColor: '#4caf50',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography
                      sx={{
                        color: '#4caf50',
                        fontWeight: 'bold',
                        mb: 0.5,
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#757575' }}>
                      {notification.timestamp}
                    </Typography>
                  </Box>
                  <Link
                    component="button"
                    sx={{
                      color: '#ff9800',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={() => console.log(`View ${notification.type}: ${notification.id}`)} // Placeholder
                  >
                    View
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {notifications.length === 0 && (
            <Typography sx={{ textAlign: 'center', color: '#757575', mt: 2 }}>
              No notifications yet.
            </Typography>
          )}
        </Box>
      </motion.div>
    </Container>
  );
}

export default Notifications;