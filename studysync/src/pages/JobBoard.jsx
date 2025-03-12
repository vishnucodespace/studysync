import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Collapse,
  TextField,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Add } from '@mui/icons-material';
import apiCall from '../utils/api';

// Demo jobs data
const demoJobs = [
  {
    id: 1,
    title: 'Software Engineer Intern',
    company: 'TechCorp',
    description: 'Work on cutting-edge projects with a focus on web development.',
    location: 'Remote',
    postedDate: '2025-03-01',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'DataInc',
    description: 'Analyze data for insights and create visualizations.',
    location: 'New York, NY',
    postedDate: '2025-03-05',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'DesignWorks',
    description: 'Design user-friendly interfaces for mobile and web apps.',
    location: 'San Francisco, CA',
    postedDate: '2025-03-07',
  },
  {
    id: 4,
    title: 'Marketing Coordinator',
    company: 'MarketPros',
    description: 'Assist in creating marketing campaigns and content.',
    location: 'Chicago, IL',
    postedDate: '2025-03-10',
  },
];

function JobBoard() {
  const [jobs, setJobs] = useState(demoJobs); // Initialize with demo data
  const [expandedJob, setExpandedJob] = useState(null);
  const [newJob, setNewJob] = useState({ title: '', company: '', description: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await apiCall('/api/jobs');
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs(demoJobs); // Fallback to demo jobs
      }
    };
    fetchJobs();
  }, []);

  const handleExpand = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleAddJob = () => {
    if (newJob.title.trim() && newJob.company.trim() && newJob.description.trim()) {
      const jobToAdd = {
        id: `local-${Date.now()}`, // Temporary ID for demo
        title: newJob.title,
        company: newJob.company,
        description: newJob.description,
        location: 'Not specified', // Default value
        postedDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
      };

      // Simulate API call to add job (optional: replace with real API call)
      try {
        // Uncomment and adjust this block for real API integration
        /*
        const response = await apiCall('/api/jobs', 'POST', {
          title: newJob.title,
          company: newJob.company,
          description: newJob.description,
        });
        setJobs([...jobs, { ...jobToAdd, id: response.id }]);
        */

        // For demo purposes, add directly to state
        setJobs([...jobs, jobToAdd]);
        setNewJob({ title: '', company: '', description: '' }); // Reset form
      } catch (error) {
        console.error('Failed to add job:', error);
        // Add to local state even if API fails (for demo)
        setJobs([...jobs, jobToAdd]);
        setNewJob({ title: '', company: '', description: '' });
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
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Job Board
        </Typography>

        {/* Form to add new jobs */}
        <Box
          sx={{
            background: 'rgba(34, 34, 54, 0.9)',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            p: 3,
            mb: 4,
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Company"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
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
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Description"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
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
            </Grid>
            <Grid item xs={12} sm={1}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={handleAddJob}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                    '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    color: '#E2E8F0',
                  }}
                >
                  <Add sx={{ mr: 1 }} /> Add
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Job Listings */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1A1A2E, #16213E)',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            p: 2,
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <motion.div
                key={job._id || job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (job._id || job.id) * 0.1 }}
              >
                <Card
                  sx={{
                    background: 'rgba(34, 34, 54, 0.9)',
                    borderRadius: 2,
                    mb: 1,
                    border: '1px solid rgba(107, 72, 255, 0.2)',
                    '&:hover': {
                      background: 'rgba(107, 72, 255, 0.1)',
                      borderColor: '#00D4FF',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      p: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleExpand(job._id || job.id)}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#00D4FF',
                          fontWeight: 'bold',
                        }}
                      >
                        {job.title}
                      </Typography>
                      <Typography sx={{ color: '#E2E8F0', opacity: 0.9 }}>
                        {job.company} - {job.location || 'Not specified'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#A0AEC0', opacity: 0.7 }}>
                        Posted on: {job.postedDate || 'N/A'}
                      </Typography>
                    </Box>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        sx={{
                          background: '#6B48FF',
                          '&:hover': { background: '#00D4FF' },
                          borderRadius: 2,
                          px: 3,
                          py: 1,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          mt: { xs: 2, sm: 0 },
                        }}
                      >
                        Apply
                      </Button>
                    </motion.div>
                  </CardContent>
                  <Collapse in={expandedJob === (job._id || job.id)}>
                    <Box
                      sx={{
                        p: 2,
                        background: 'rgba(26, 26, 46, 0.9)',
                        borderRadius: '0 0 8px 8px',
                        borderTop: '1px solid rgba(107, 72, 255, 0.2)',
                      }}
                    >
                      <Typography sx={{ color: '#A0AEC0', opacity: 0.8 }}>
                        {job.description || 'No description available.'}
                      </Typography>
                    </Box>
                  </Collapse>
                </Card>
              </motion.div>
            ))
          ) : (
            <Typography sx={{ color: '#A0AEC0', textAlign: 'center', p: 2 }}>
              No jobs available yet. Add one to get started!
            </Typography>
          )}
        </Box>
      </motion.div>
    </Container>
  );
}

export default JobBoard;