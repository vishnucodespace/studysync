// src/pages/Dashboard.jsx (Updated Styling)
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Dashboard({ darkMode }) {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setPosts([
      { id: 1, user: { name: 'John Doe' }, content: 'Excited for the upcoming fest!' },
      { id: 2, user: { name: 'Jane Smith' }, content: 'Looking for study group members.' },
    ]);
    setEvents([
      { id: 1, title: 'Tech Fest 2025', date: '2025-03-20' },
      { id: 2, title: 'Cultural Night', date: '2025-03-25' },
    ]);
    setJobs([
      { id: 1, title: 'Software Intern', company: 'TechCorp' },
      { id: 2, title: 'Data Analyst', company: 'DataInc' },
    ]);
    setGroups([
      { id: 1, name: 'CS Study Group', description: 'Computer science enthusiasts.' },
      { id: 2, name: 'Math Club', description: 'Math lovers unite!' },
    ]);
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        background: darkMode
          ? 'linear-gradient(135deg, #1A1A2E, #16213E)'
          : 'linear-gradient(135deg, #F7F9FC, #EDEFF1)',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card
              sx={{
                mb: 3,
                background: darkMode
                  ? 'linear-gradient(45deg, #6B48FF, #00D4FF)'
                  : 'linear-gradient(45deg, #FF6F61, #6B48FF)',
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
                  John Doe
                </Typography>
                <Typography variant="body2" sx={{ color: '#E2E8F0' }}>
                  XYZ University
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ mt: 2, borderColor: '#FFFFFF', color: '#FFFFFF' }}
                  component={Link}
                  to="/profile"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                  Quick Links
                </Typography>
                {['groups', 'resources', 'events', 'jobs'].map((link) => (
                  <Button
                    key={link}
                    variant="contained"
                    fullWidth
                    sx={{
                      mb: 1,
                      background: darkMode ? '#6B48FF' : '#FF6F61',
                      '&:hover': { background: darkMode ? '#00D4FF' : '#6B48FF' },
                    }}
                    component={Link}
                    to={`/${link}`}
                  >
                    {link.charAt(0).toUpperCase() + link.slice(1)}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextField
              label="Search CampusConnect..."
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
                },
              }}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: darkMode ? '#00D4FF' : '#FF6F61', fontWeight: 'bold' }}
            >
              News Feed
            </Typography>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                      {post.user.name}
                    </Typography>
                    <Typography sx={{ color: theme.palette.text.secondary }}>{post.content}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={3}>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            {[
              { title: 'Upcoming Events', data: events, link: '/events', render: (item) => item.title },
              { title: 'Job Opportunities', data: jobs, link: '/jobs', render: (item) => item.title },
              { title: 'Suggested Groups', data: groups, link: '/groups', render: (item) => item.name },
            ].map((section, idx) => (
              <Card key={idx} sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: darkMode ? '#00D4FF' : '#FF6F61' }}>
                    {section.title}
                  </Typography>
                  {section.data.map((item) => (
                    <Typography key={item.id} sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      {section.render(item)}
                    </Typography>
                  ))}
                  <Button
                    component={Link}
                    to={section.link}
                    size="small"
                    sx={{ color: darkMode ? '#00D4FF' : '#FF6F61' }}
                  >
                    See All
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;