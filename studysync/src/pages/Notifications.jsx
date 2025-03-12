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
import { Visibility } from '@mui/icons-material';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      { id: 1, message: 'Jane liked your post.', timestamp: '5 mins ago', type: 'like' },
      { id: 2, message: 'New event added: College Fest.', timestamp: '1 hr ago', type: 'event' },
    ]);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        background: '#1A1A2E', // Night theme base
        minHeight: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Matches Navbar
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
        >
          Notifications
        </Typography>

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
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
                  border: '2px solid rgba(107, 72, 255, 0.2)',
                  mb: 2,
                  '&:hover': {
                    borderColor: '#00D4FF',
                    boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: '#00D4FF', // Cyan text
                        fontWeight: 'bold',
                        mb: 0.5,
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#A0AEC0' }}>
                      {notification.timestamp}
                    </Typography>
                  </Box>
                  <Link
                    component="button"
                    sx={{
                      color: '#6B48FF', // Purple link
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      '&:hover': { color: '#00D4FF', textDecoration: 'underline' },
                    }}
                    onClick={() => console.log(`View ${notification.type}: ${notification.id}`)}
                  >
                    <Visibility sx={{ mr: 0.5, verticalAlign: 'middle' }} /> View
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {notifications.length === 0 && (
            <Typography sx={{ textAlign: 'center', color: '#A0AEC0', mt: 2 }}>
              No notifications yet.
            </Typography>
          )}
        </Box>
      </motion.div>
    </Container>
  );
}

export default Notifications;