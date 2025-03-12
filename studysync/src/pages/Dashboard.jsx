// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar'; // Adjust path as necessary

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
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

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        background: 'linear-gradient(135deg, #1A1A2E, #16213E)',
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
                background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
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
                      background: '#6B48FF',
                      '&:hover': { background: '#00D4FF' },
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

        {/* Main Content Area */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SearchBar onSearch={handleSearch} />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: '#00D4FF', fontWeight: 'bold', mt: 3 }}
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
                  <Typography variant="h6" sx={{ color: '#00D4FF' }}>
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
                    sx={{ color: '#00D4FF' }}
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