// src/pages/Messages.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

function Messages() {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setConversations([
      {
        id: 1,
        user: { name: 'Jane Smith', avatar: '' },
        lastMessage: 'Hey, want to join my study group?',
        timestamp: '10:30 AM',
      },
      {
        id: 2,
        user: { name: 'Prof. Adams', avatar: '' },
        lastMessage: 'Office hours moved to 2 PM.',
        timestamp: 'Yesterday',
      },
    ]);
  }, []);

  const mockMessages = [
    { id: 1, sender: 'Jane Smith', text: 'Hey, how’s it going?', timestamp: '10:25 AM' },
    { id: 2, sender: 'You', text: 'Good! How about you?', timestamp: '10:26 AM' },
    { id: 3, sender: 'Jane Smith', text: 'Great! Let’s study together?', timestamp: '10:27 AM' },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending:', newMessage);
      setNewMessage('');
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
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
        >
          Messages
        </Typography>

        <Grid container spacing={3}>
          {/* Left Sidebar: Conversation List */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '75vh',
                overflowY: 'auto',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
                border: '1px solid rgba(107, 72, 255, 0.2)',
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <List>
                  {conversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <ListItem
                        button
                        onClick={() => setSelectedConversation(conv)}
                        sx={{
                          borderBottom: `1px solid ${theme.palette.divider}`,
                          background:
                            selectedConversation?.id === conv.id
                              ? 'rgba(107, 72, 255, 0.3)' // Purple highlight
                              : 'transparent',
                          '&:hover': {
                            background: 'rgba(107, 72, 255, 0.2)', // Subtle hover
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: '#00D4FF', // Cyan avatar
                              boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
                            }}
                          >
                            {conv.user.name[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#E2E8F0', fontWeight: 'bold' }}>
                              {conv.user.name}
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ color: '#A0AEC0' }}>
                              {conv.lastMessage}
                            </Typography>
                          }
                        />
                        <Typography variant="caption" sx={{ color: '#A0AEC0' }}>
                          {conv.timestamp}
                        </Typography>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Main Area: Chat Window */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: '75vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(0, 212, 255, 0.1))', // Night chat
                border: '1px solid rgba(107, 72, 255, 0.2)',
              }}
            >
              <CardContent sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                {selectedConversation ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        color: '#00D4FF', // Cyan header
                        textShadow: '0 0 5px rgba(0, 212, 255, 0.5)',
                      }}
                    >
                      {selectedConversation.user.name}
                    </Typography>
                    {mockMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                          display: 'flex',
                          justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '60%',
                            p: 2,
                            borderRadius: '12px',
                            background:
                              msg.sender === 'You'
                                ? 'linear-gradient(135deg, #6B48FF, #00D4FF)' // Your messages
                                : 'rgba(255, 255, 255, 0.1)', // Others
                            color: msg.sender === 'You' ? '#FFFFFF' : '#E2E8F0',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Typography>{msg.text}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            {msg.timestamp}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: '#A0AEC0',
                      mt: '20%',
                      fontSize: '1.2rem',
                    }}
                  >
                    Select a conversation to start chatting!
                  </Typography>
                )}
              </CardContent>

              {selectedConversation && (
                <Box sx={{ p: 2, borderTop: `1px solid rgba(107, 72, 255, 0.2)` }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                          '&:hover fieldset': { borderColor: '#00D4FF' },
                        },
                        '& .MuiInputBase-input': { color: '#E2E8F0' },
                      }}
                    />
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="contained"
                        onClick={handleSendMessage}
                        sx={{
                          background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                          color: '#FFFFFF',
                          '&:hover': {
                            boxShadow: '0 0 15px rgba(107, 72, 255, 0.5)',
                          },
                        }}
                      >
                        Send
                      </Button>
                    </motion.div>
                  </Box>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Messages;