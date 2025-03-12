import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Add } from '@mui/icons-material'; // Added for create group
import apiCall from '../utils/api';

function StudyGroups() {
  const [groups, setGroups] = useState([]);
  // Added state for group creation
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await apiCall('/api/groups');
        setGroups(data);
      } catch (err) {
        console.error('Fetch groups error:', err);
        setGroups([
          { id: 1, name: 'CS Study Group', description: 'For computer science students.' },
          { id: 2, name: 'Math Club', description: 'Math enthusiasts unite!' },
        ]);
      }
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      const updatedGroup = await apiCall(`/api/groups/${groupId}/join`, 'POST');
      setGroups(groups.map(g => g.id === groupId ? updatedGroup : g));
    } catch (err) {
      console.error('Join group error:', err);
    }
  };

  // Added group creation handler
  const handleCreateGroup = async () => {
    try {
      const createdGroup = await apiCall('/api/groups/create', 'POST', newGroup);
      setGroups([...groups, createdGroup]);
      setNewGroup({ name: '', description: '' });
      setOpenCreateDialog(false);
    } catch (err) {
      console.error('Create group error:', err);
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
          Study Groups
        </Typography>
        {/* Added Create Group Button */}
        <Button
          variant="contained"
          sx={{ mb: 3, background: 'linear-gradient(45deg, #6B48FF, #00D4FF)' }}
          onClick={() => setOpenCreateDialog(true)}
        >
          <Add sx={{ mr: 1 }} /> Create Group
        </Button>

        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: group.id * 0.1 }}
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
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00D4FF',
                        fontWeight: 'bold',
                        mb: 1,
                      }}
                    >
                      {group.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#A0AEC0',
                        mb: 2,
                      }}
                    >
                      {group.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleJoinGroup(group.id)}
                        sx={{
                          background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                          '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                          borderRadius: 2,
                          py: 1,
                          px: 3,
                          fontWeight: 'bold',
                          color: '#E2E8F0',
                        }}
                      >
                        Join Group
                      </Button>
                    </motion.div>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        {/* Added Create Group Dialog */}
        <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogContent>
            <TextField
              label="Group Name"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateGroup} variant="contained" sx={{ background: '#6B48FF' }}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
}

export default StudyGroups;