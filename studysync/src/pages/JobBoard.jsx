// src/pages/JobBoard.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Collapse,
} from '@mui/material';
import { motion } from 'framer-motion';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(() => {
    setJobs([
      { id: 1, title: 'Software Engineer Intern', company: 'TechCorp', description: 'Work on cutting-edge projects.' },
      { id: 2, title: 'Data Analyst', company: 'DataInc', description: 'Analyze data for insights.' },
    ]);
  }, []);

  const handleExpand = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
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
            background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Sync with Navbar
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

        <Box
          sx={{
            background: 'linear-gradient(135deg, #1A1A2E, #16213E)', // Matches Dashboard
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            p: 2,
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: job.id * 0.1 }}
            >
              <Card
                sx={{
                  background: 'rgba(34, 34, 54, 0.9)', // Glassy night card
                  borderRadius: 2,
                  mb: 1,
                  border: '1px solid rgba(107, 72, 255, 0.2)', // Subtle purple
                  '&:hover': {
                    background: 'rgba(107, 72, 255, 0.1)',
                    borderColor: '#00D4FF', // Cyan on hover
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
                  onClick={() => handleExpand(job.id)}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00D4FF', // Cyan for night theme
                        fontWeight: 'bold',
                      }}
                    >
                      {job.title}
                    </Typography>
                    <Typography sx={{ color: '#E2E8F0', opacity: 0.9 }}>
                      {job.company}
                    </Typography>
                  </Box>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: '#6B48FF', // Purple base
                        '&:hover': { background: '#00D4FF' }, // Cyan hover
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
                <Collapse in={expandedJob === job.id}>
                  <Box
                    sx={{
                      p: 2,
                      background: 'rgba(26, 26, 46, 0.9)', // Slightly darker for depth
                      borderRadius: '0 0 8px 8px',
                      borderTop: '1px solid rgba(107, 72, 255, 0.2)',
                    }}
                  >
                    <Typography sx={{ color: '#A0AEC0', opacity: 0.8 }}>
                      {job.description}
                    </Typography>
                  </Box>
                </Collapse>
              </Card>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Container>
  );
}

export default JobBoard;