// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Card, CardContent, Button, TextField, Badge, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import ConnectionRequestButton from '../components/ConnectionRequestButton';
import GroupJoinButton from '../components/GroupJoinButton';
import EventRSVPButton from '../components/EventRSVPButton';
import JobApplyButton from '../components/JobApplyButton';
import NotificationBadge from '../components/NotificationBadge';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [notifications, setNotifications] = useState(3); // Example count

  useEffect(() => {
    // Mock data; replace with backend API calls
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card sx={{ mb: 3, background: 'linear-gradient(45deg, #4caf50, #81c784)' }}>
              <CardContent>
                <Avatar sx={{ width: 60, height: 60, mb: 2 }} />
                <Typography variant="h6" color="white">John Doe</Typography>
                <Typography variant="body2" color="white">XYZ University</Typography>
                <Button variant="outlined" color="inherit" sx={{ mt: 2 }} component={Link} to="/profile">
                  View Profile
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6">Quick Links</Typography>
                <Button fullWidth component={Link} to="/groups">Study Groups</Button>
                <Button fullWidth component={Link} to="/resources">Resources</Button>
                <Button fullWidth component={Link} to="/events">Events</Button>
                <Button fullWidth component={Link} to="/jobs">Jobs</Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Search Bar */}
            <TextField
              label="Search StudySync..."
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            {/* News Feed */}
            <Typography variant="h5" gutterBottom>News Feed</Typography>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Post post={post} />
              </motion.div>
            ))}
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={3}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Notifications */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  Notifications <NotificationBadge count={notifications} />
                </Typography>
                <Typography variant="body2">Jane liked your post.</Typography>
                <Button component={Link} to="/notifications" size="small">See All</Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">Upcoming Events</Typography>
                {events.map((event) => (
                  <div key={event.id} style={{ marginBottom: '1rem' }}>
                    <Typography>{event.title}</Typography>
                    <Typography variant="body2">{event.date}</Typography>
                    <EventRSVPButton />
                  </div>
                ))}
                <Button component={Link} to="/events" size="small">See All</Button>
              </CardContent>
            </Card>

            {/* Job Opportunities */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">Job Opportunities</Typography>
                {jobs.map((job) => (
                  <div key={job.id} style={{ marginBottom: '1rem' }}>
                    <Typography>{job.title}</Typography>
                    <Typography variant="body2">{job.company}</Typography>
                    <JobApplyButton />
                  </div>
                ))}
                <Button component={Link} to="/jobs" size="small">See All</Button>
              </CardContent>
            </Card>

            {/* Suggested Study Groups */}
            <Card>
              <CardContent>
                <Typography variant="h6">Suggested Groups</Typography>
                {groups.map((group) => (
                  <div key={group.id} style={{ marginBottom: '1rem' }}>
                    <Typography>{group.name}</Typography>
                    <Typography variant="body2">{group.description}</Typography>
                    <GroupJoinButton />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;