// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
        boxShadow: '0 0 20px rgba(107, 72, 255, 0.5)',
        borderRadius: '0 0 16px 16px',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: '#FFFFFF', textDecoration: 'none', fontWeight: 'bold' }}
        >
          StudySync
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['dashboard', 'profile', 'messages', 'groups', 'resources', 'events', 'jobs', 'search', 'notifications'].map((route) => (
            <motion.div key={route} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Typography
                component={Link}
                to={`/${route}`}
                sx={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  '&:hover': { textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' },
                }}
              >
                {route.charAt(0).toUpperCase() + route.slice(1)}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;