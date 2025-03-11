// src/pages/Profile.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Avatar, 
  Box 
} from '@mui/material';
import { motion } from 'framer-motion';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [college, setCollege] = useState('XYZ University');
  const [graduationYear, setGraduationYear] = useState('2023');

  const handleSave = () => {
    // TODO: Save to backend
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Card */}
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, #4caf50, #81c784)', // Green gradient
            borderRadius: 3, 
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)', 
            overflow: 'hidden' 
          }}
        >
          {/* Header Section */}
          <Box 
            sx={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              p: 3, 
              display: 'flex', 
              alignItems: 'center', 
              flexDirection: { xs: 'column', md: 'row' } 
            }}
          >
            <Avatar
              sx={{ 
                width: 100, 
                height: 100, 
                mr: { md: 3 }, 
                mb: { xs: 2, md: 0 }, 
                border: '3px solid white' 
              }}
            />
            <Box sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Typography variant="subtitle1">
                {college} | Class of {graduationYear}
              </Typography>
            </Box>
          </Box>

          {/* Content Section */}
          <CardContent sx={{ background: 'white', p: 3 }}>
            {isEditing ? (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                  label="College"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <TextField
                  label="Graduation Year"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ 
                      mt: 2, 
                      py: 1.5, 
                      borderRadius: 2, 
                      background: '#ff9800', // Orange button
                      '&:hover': { background: '#f57c00' }
                    }}
                  >
                    Save Profile
                  </Button>
                </motion.div>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  <strong>Name:</strong> {name}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  <strong>College:</strong> {college}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                  <strong>Graduation Year:</strong> {graduationYear}
                </Typography>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                    sx={{ 
                      mt: 2, 
                      py: 1.5, 
                      borderRadius: 2, 
                      background: '#ff9800', 
                      '&:hover': { background: '#f57c00' }
                    }}
                  >
                    Edit Profile
                  </Button>
                </motion.div>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default Profile;