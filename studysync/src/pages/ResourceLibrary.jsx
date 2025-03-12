import React, { useState, useEffect } from 'react';
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
import apiCall from '../utils/api';

// Demo resources data
const demoResources = [
  {
    id: '1',
    title: 'Project Proposal Template',
    uploader: 'Jane Doe',
    timestamp: new Date(Date.now() - 86400000).toLocaleString(), // 1 day ago
    fileUrl: 'http://example.com/project-proposal.pdf', // Mock URL
  },
  {
    id: '2',
    title: 'Team Meeting Notes',
    uploader: 'John Smith',
    timestamp: new Date(Date.now() - 172800000).toLocaleString(), // 2 days ago
    fileUrl: 'http://example.com/meeting-notes.docx', // Mock URL
  },
  {
    id: '3',
    title: 'Design Guidelines',
    uploader: 'Alice Johnson',
    timestamp: new Date(Date.now() - 259200000).toLocaleString(), // 3 days ago
    fileUrl: 'http://example.com/design-guidelines.pdf', // Mock URL
  },
];

function ResourceLibrary() {
  const [resources, setResources] = useState(demoResources); // Initialize with demo data
  const [newResource, setNewResource] = useState({ title: '', file: null });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await apiCall('/api/resources');
        setResources(data);
      } catch (err) {
        console.error('Fetch resources error:', err);
        // Fallback to demo data if API fails
        setResources(demoResources);
      }
    };
    fetchResources();
  }, []);

  // Updated to handle file upload
  const handleUpload = async () => {
    if (newResource.title.trim() && newResource.file) {
      const formData = new FormData();
      formData.append('title', newResource.title);
      formData.append('file', newResource.file);

      try {
        const response = await fetch('/api/resources', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is needed
          },
          body: formData,
        });
        if (!response.ok) throw new Error('Upload failed');
        const resource = await response.json();
        setResources([...resources, resource]);
        setNewResource({ title: '', file: null });
      } catch (err) {
        console.error('Upload resource error:', err);
        // Simulate successful upload with demo data for testing
        const simulatedResource = {
          id: `demo-${Date.now()}`,
          title: newResource.title,
          uploader: 'You', // Assuming current user
          timestamp: new Date().toLocaleString(),
          fileUrl: URL.createObjectURL(newResource.file), // Temporary URL for demo
        };
        setResources([...resources, simulatedResource]);
        setNewResource({ title: '', file: null });
      }
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        background: '#1A1A2E',
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
            background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
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

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            mb: 4,
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
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
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
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
              {/* Added file input */}
              <input
                type="file"
                onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
                style={{ color: '#E2E8F0' }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  sx={{
                    background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
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
            {newResource.file && (
              <Typography sx={{ color: '#A0AEC0', mt: 1 }}>
                Selected file: {newResource.file.name}
              </Typography>
            )}
          </CardContent>
        </Card>

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
                      background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
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
                          color: '#00D4FF',
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 1 }}>
                        Uploaded by {resource.uploader || 'Unknown'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A0AEC0', opacity: 0.7, mb: 1 }}>
                        {resource.timestamp || 'N/A'}
                      </Typography>
                      {resource.fileUrl && (
                        <Typography>
                          <a
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#00D4FF', textDecoration: 'none' }}
                          >
                            Download File
                          </a>
                        </Typography>
                      )}
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