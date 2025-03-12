// src/pages/StudyGroups.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';

function StudyGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups([
      { id: 1, name: 'CS Study Group', description: 'For computer science students.' },
      { id: 2, name: 'Math Club', description: 'Math enthusiasts unite!' },
    ]);
  }, []);

  return (
    <Container
      maxWidth="lg"
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
          Study Groups
        </Typography>

        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: group.id * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
                    border: '2px solid rgba(107, 72, 255, 0.2)',
                    '&:hover': {
                      borderColor: '#00D4FF', // Cyan on hover
                      boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00D4FF', // Cyan for night theme
                        fontWeight: 'bold',
                        mb: 1,
                      }}
                    >
                      {group.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#A0AEC0', // Secondary text
                        mb: 2,
                      }}
                    >
                      {group.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        sx={{
                          background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Matches theme
                          '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                          borderRadius: 2,
                          py: 1,
                          px: 3,
                          fontWeight: 'bold',
                          color: '#E2E8F0',
                        }}
                      >
                        Join Group
                      </Button>
                    </motion.div>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default StudyGroups;