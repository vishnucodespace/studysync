// src/pages/ResourceLibrary.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CloudUpload } from '@mui/icons-material';

function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState('');

  const handleUpload = () => {
    if (newResource.trim()) {
      setResources([...resources, { id: resources.length + 1, title: newResource, uploader: 'You', timestamp: new Date().toLocaleTimeString() }]);
      setNewResource('');
    }
  };

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
          Resource Library
        </Typography>

        {/* Upload Section */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            mb: 4,
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
            border: '1px solid rgba(107, 72, 255, 0.2)',
            p: 3,
            '&:hover': { borderColor: '#00D4FF' },
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: 'center',
              }}
            >
              <TextField
                label="Resource Title"
                value={newResource}
                onChange={(e) => setNewResource(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                    '&:hover fieldset': { borderColor: '#00D4FF' },
                    '&.Mui-focused fieldset': { borderColor: '#6B48FF' },
                  },
                  '& .MuiInputLabel-root': { color: '#A0AEC0' },
                  '& .MuiInputBase-input': { color: '#E2E8F0' },
                }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  sx={{
                    background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Theme gradient
                    '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                    borderRadius: 2,
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    color: '#E2E8F0',
                    minWidth: { sm: '150px' },
                  }}
                >
                  <CloudUpload sx={{ mr: 1 }} /> Upload
                </Button>
              </motion.div>
            </Box>
          </CardContent>
        </Card>

        {/* Resource Grid */}
        <Grid container spacing={3}>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: resource.id * 0.1 }}
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
                        borderColor: '#00D4FF',
                        boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
                      },
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#00D4FF', // Cyan title
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
                        Uploaded by {resource.uploader}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A0AEC0', opacity: 0.7 }}>
                        {resource.timestamp}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#A0AEC0',
                  fontStyle: 'italic',
                  mt: 2,
                }}
              >
                No resources yet. Start by uploading one!
              </Typography>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default ResourceLibrary;