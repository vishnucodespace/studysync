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

function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState('');

  const handleUpload = () => {
    // TODO: Upload to backend
    if (newResource.trim()) {
      setResources([...resources, { id: resources.length + 1, title: newResource }]);
      setNewResource('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          }}
        >
          Resource Library
        </Typography>

        {/* Upload Section */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            mb: 4,
            background: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
            p: 3,
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
                    '&:hover fieldset': { borderColor: '#4caf50' },
                    '&.Mui-focused fieldset': { borderColor: '#ff9800' },
                  },
                }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleUpload}
                  sx={{
                    background: '#ff9800',
                    '&:hover': { background: '#f57c00' },
                    borderRadius: 2,
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    minWidth: { sm: '150px' },
                  }}
                >
                  Upload
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
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                      background: 'white',
                      border: '2px solid #e0e0e0',
                      '&:hover': {
                        borderColor: '#4caf50',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                      },
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#4caf50',
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#757575' }}>
                        Uploaded by You
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
                  color: '#757575',
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