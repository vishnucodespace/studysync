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
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Save, GitHub, LinkedIn, Twitter } from '@mui/icons-material';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [college, setCollege] = useState('XYZ University');
  const [graduationYear, setGraduationYear] = useState('2023');
  const [bio, setBio] = useState('CS student passionate about AI and open-source.');
  const [socialLinks, setSocialLinks] = useState({
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
  });

  const handleSave = () => {
    // TODO: Save to backend
    setIsEditing(false);
  };

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
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Matches Navbar
              p: 3,
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mr: { md: 3 },
                mb: { xs: 2, md: 0 },
                border: '3px solid #FFFFFF',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
              }}
            />
            <Box sx={{ color: '#E2E8F0', textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Typography variant="subtitle1">
                {college} | Class of {graduationYear}
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton
                  component="a"
                  href={socialLinks.github}
                  target="_blank"
                  sx={{ color: '#E2E8F0', '&:hover': { color: '#00D4FF' } }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href={socialLinks.linkedin}
                  target="_blank"
                  sx={{ color: '#E2E8F0', '&:hover': { color: '#00D4FF' } }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  component="a"
                  href={socialLinks.twitter}
                  target="_blank"
                  sx={{ color: '#E2E8F0', '&:hover': { color: '#00D4FF' } }}
                >
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Content Section */}
          <CardContent sx={{ background: 'rgba(26, 26, 46, 0.9)', p: 3 }}>
            {isEditing ? (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="College"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="Graduation Year"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                      '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                    }}
                  >
                    <Save sx={{ mr: 1 }} /> Save Profile
                  </Button>
                </motion.div>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>Name:</strong> {name}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>College:</strong> {college}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>Graduation Year:</strong> {graduationYear}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>Bio:</strong> {bio}
                </Typography>
                {/* Profile Stats */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ color: '#00D4FF', fontWeight: 'bold', mb: 1 }}>
                    Stats
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label="Posts: 42" sx={{ background: '#6B48FF', color: '#E2E8F0' }} />
                    <Chip label="Connections: 128" sx={{ background: '#6B48FF', color: '#E2E8F0' }} />
                    <Chip label="Groups: 5" sx={{ background: '#6B48FF', color: '#E2E8F0' }} />
                  </Box>
                </Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                      '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                    }}
                  >
                    <Edit sx={{ mr: 1 }} /> Edit Profile
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