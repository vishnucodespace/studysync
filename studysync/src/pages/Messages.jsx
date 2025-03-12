import React, { useState, useEffect, useRef } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemSecondaryAction,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Send, AttachFile, GroupAdd, PersonRemove } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import apiCall from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

// Demo conversations data
const demoConversations = [
  {
    id: '1',
    name: 'John Doe',
    type: 'private',
    user: { name: 'John Doe' },
    lastMessage: 'Hey, how are you?',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(), // 1 hour ago
    unread: true,
    admin: 'Unknown',
  },
  {
    id: '2',
    name: 'Work Group',
    type: 'group',
    lastMessage: 'Meeting at 3 PM',
    timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(), // 2 hours ago
    unread: false,
    admin: 'Jane Smith',
  },
  {
    id: '3',
    name: 'Alice Smith',
    type: 'private',
    user: { name: 'Alice Smith' },
    lastMessage: 'See you tomorrow!',
    timestamp: new Date(Date.now() - 18000000).toLocaleTimeString(), // 5 hours ago
    unread: false,
    admin: 'Unknown',
  },
];

// Demo messages data for selected conversation
const demoMessages = {
  '1': [
    {
      id: 'm1',
      sender: 'John Doe',
      text: 'Hey, how are you?',
      fileUrl: null,
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      read: false,
    },
    {
      id: 'm2',
      sender: 'You',
      text: 'I’m good, thanks! How about you?',
      fileUrl: null,
      timestamp: new Date(Date.now() - 3500000).toLocaleTimeString(),
      read: true,
    },
  ],
  '2': [
    {
      id: 'm3',
      sender: 'Jane Smith',
      text: 'Meeting at 3 PM today, don’t forget!',
      fileUrl: null,
      timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(),
      read: true,
    },
    {
      id: 'm4',
      sender: 'You',
      text: 'Got it, thanks for the reminder!',
      fileUrl: null,
      timestamp: new Date(Date.now() - 7100000).toLocaleTimeString(),
      read: true,
    },
  ],
  '3': [
    {
      id: 'm5',
      sender: 'Alice Smith',
      text: 'See you tomorrow!',
      fileUrl: null,
      timestamp: new Date(Date.now() - 18000000).toLocaleTimeString(),
      read: true,
    },
  ],
};

function Messages() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState(demoConversations); // Initialize with demo data
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState(location.state?.postContent || '');
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]); // Initially empty, populated when a conversation is selected
  const [groupDetails, setGroupDetails] = useState(null);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [error, setError] = useState(null); // Keep error state for logging, but don't display it
  const messagesEndRef = useRef(null);

  // Mock group details for demo purposes
  const demoGroupDetails = {
    id: '2',
    name: 'Work Group',
    admin: { _id: 'admin1', name: 'Jane Smith' },
    members: [
      { _id: 'admin1', name: 'Jane Smith' },
      { _id: 'user1', name: 'You' },
      { _id: 'user2', name: 'Bob Johnson' },
    ],
  };

  // Fetch conversations (mocked with demo data unless API fails)
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const data = await apiCall('/api/messages/conversations');
        const formattedConvs = data.map(conv => ({
          ...conv,
          timestamp: new Date(conv.timestamp).toLocaleTimeString(),
          admin: conv.admin || 'Unknown',
          user: conv.user || { name: 'Unknown' },
        }));
        setConversations(formattedConvs);
        if (location.state?.recipientId) {
          const conv = formattedConvs.find(c => c.id === location.state.recipientId && c.type === 'private');
          if (conv) setSelectedConversation(conv);
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        // Log error but don't set it to state for display
        setConversations(demoConversations); // Use demo data as fallback
      }
    };
    fetchConversations();
  }, [user, navigate, location.state]);

  // Fetch messages for selected conversation (mocked with demo data)
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        const data = await apiCall(`/api/messages/${selectedConversation.id}`);
        const formattedMessages = data.map(msg => ({
          id: msg._id,
          sender: msg.sender?.name || 'Unknown',
          text: msg.content,
          fileUrl: msg.fileUrl,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          read: msg.readBy.some(id => id.toString() === user.id),
        }));
        setMessages(formattedMessages);
        if (selectedConversation.type === 'group') {
          const group = await apiCall(`/api/groups/${selectedConversation.id}`);
          setGroupDetails({
            ...group,
            admin: group.admin || { _id: '', name: 'Unknown' },
            members: group.members || [],
          });
        } else {
          setGroupDetails(null);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        // Log error but don't set it to state for display
        setMessages(demoMessages[selectedConversation.id] || []);
        if (selectedConversation.type === 'group') {
          setGroupDetails(demoGroupDetails);
        } else {
          setGroupDetails(null);
        }
      }
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    fetchMessages();
  }, [selectedConversation, user]);

  // Send message (simulated for demo)
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !file) return;
    if (!selectedConversation) {
      console.error('No conversation selected'); // Log instead of displaying
      return;
    }

    const newMsg = {
      id: `m${Date.now()}`,
      sender: user.name || 'You',
      text: newMessage,
      fileUrl: file ? URL.createObjectURL(file) : null,
      timestamp: new Date().toLocaleTimeString(),
      read: true,
    };

    try {
      // Simulate API call
      setMessages(prev => [...prev, newMsg]);
      setConversations(convs =>
        convs.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMsg.text || '[File]', timestamp: new Date().toLocaleTimeString(), unread: false }
            : conv
        )
      );
      setNewMessage('');
      setFile(null);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to send message:', error);
      // Log error but don't display it
    }
  };

  // Group management (simulated for demo)
  const handleAddMember = async (userId) => {
    try {
      const newMember = { _id: userId, name: `User ${userId}` };
      setGroupDetails(prev => ({
        ...prev,
        members: [...prev.members, newMember],
      }));
    } catch (error) {
      console.error('Failed to add member:', error);
      // Log error but don't display it
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      setGroupDetails(prev => ({
        ...prev,
        members: prev.members.filter(member => member._id !== userId),
      }));
    } catch (error) {
      console.error('Failed to remove member:', error);
      // Log error but don't display it
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
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
        >
          Messages
        </Typography>

        {/* Removed error display */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '75vh',
                overflowY: 'auto',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
                border: '1px solid rgba(107, 72, 255, 0.2)',
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <List>
                  {conversations.length > 0 ? (
                    conversations.map((conv) => (
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
                                ? 'rgba(107, 72, 255, 0.3)'
                                : 'transparent',
                            '&:hover': {
                              background: 'rgba(107, 72, 255, 0.2)',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: conv.unread ? '#FF6B6B' : '#00D4FF',
                                boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
                              }}
                            >
                              {conv.type === 'group' ? 'G' : conv.user?.name[0] || 'U'}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography sx={{ color: '#E2E8F0', fontWeight: 'bold' }}>
                                {conv.type === 'group' ? `${conv.name} (Group)` : conv.user?.name || conv.name}
                              </Typography>
                            }
                            secondary={
                              <Typography sx={{ color: '#A0AEC0' }}>
                                {conv.type === 'group' && `Admin: ${conv.admin} | `}
                                {conv.lastMessage}
                              </Typography>
                            }
                          />
                          <Typography variant="caption" sx={{ color: '#A0AEC0' }}>
                            {conv.timestamp}
                          </Typography>
                        </ListItem>
                      </motion.div>
                    ))
                  ) : (
                    <Typography sx={{ color: '#A0AEC0', textAlign: 'center', mt: 4 }}>
                      No conversations yet.
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: '75vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(0, 212, 255, 0.1))',
                border: '1px solid rgba(107, 72, 255, 0.2)',
              }}
            >
              <CardContent sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                {selectedConversation ? (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: '#00D4FF',
                          textShadow: '0 0 5px rgba(0, 212, 255, 0.5)',
                        }}
                      >
                        {selectedConversation.type === 'group'
                          ? `${selectedConversation.name} (Group) - Admin: ${selectedConversation.admin}`
                          : selectedConversation.user?.name || selectedConversation.name}
                      </Typography>
                      {selectedConversation.type === 'group' &&
                        groupDetails?.admin._id.toString() === (user?.id || 'user1') && (
                          <IconButton onClick={() => setOpenGroupDialog(true)} sx={{ color: '#00D4FF' }}>
                            <GroupAdd />
                          </IconButton>
                        )}
                    </Box>
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          sx={{
                            display: 'flex',
                            justifyContent: msg.sender === (user?.name || 'You') ? 'flex-end' : 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: '60%',
                              p: 2,
                              borderRadius: '12px',
                              background:
                                msg.sender === (user?.name || 'You')
                                  ? 'linear-gradient(135deg, #6B48FF, #00D4FF)'
                                  : 'rgba(255, 255, 255, 0.1)',
                              color: msg.sender === (user?.name || 'You') ? '#FFFFFF' : '#E2E8F0',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Typography>{msg.text}</Typography>
                            {msg.fileUrl && (
                              <Box>
                                {msg.fileUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                                  <img
                                    src={msg.fileUrl}
                                    alt="Attachment"
                                    style={{ maxWidth: '200px', borderRadius: '8px' }}
                                  />
                                ) : (
                                  <Typography>
                                    <a
                                      href={msg.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: '#00D4FF' }}
                                    >
                                      [Download File]
                                    </a>
                                  </Typography>
                                )}
                              </Box>
                            )}
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              {msg.timestamp} {msg.read && msg.sender === (user?.name || 'You') && '✓✓'}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))
                    ) : (
                      <Typography sx={{ color: '#A0AEC0', textAlign: 'center', mt: 4 }}>
                        No messages yet.
                      </Typography>
                    )}
                    <div ref={messagesEndRef} />
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
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <IconButton component="label">
                      <AttachFile sx={{ color: '#00D4FF' }} />
                      <input
                        type="file"
                        hidden
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </IconButton>
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
                        <Send />
                      </Button>
                    </motion.div>
                  </Box>
                  {file && (
                    <Typography sx={{ color: '#A0AEC0', mt: 1 }}>
                      Attached: {file.name}
                    </Typography>
                  )}
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>

        {/* Group Management Dialog */}
        {groupDetails && (
          <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)}>
            <DialogTitle sx={{ color: '#00D4FF' }}>
              Manage {groupDetails.name}
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ color: '#E2E8F0' }}>Members:</Typography>
              <List>
                {groupDetails.members.map(member => (
                  <ListItem key={member._id}>
                    <ListItemText primary={member.name} sx={{ color: '#E2E8F0' }} />
                    {member._id.toString() !== groupDetails.admin._id.toString() && (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveMember(member._id)}
                          sx={{ color: '#FF6B6B' }}
                        >
                          <PersonRemove />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
              <TextField
                label="Add Member ID"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddMember(e.target.value);
                    e.target.value = '';
                  }
                }}
                sx={{ mt: 2, input: { color: '#E2E8F0' }, label: { color: '#A0AEC0' } }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenGroupDialog(false)} sx={{ color: '#00D4FF' }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </motion.div>
    </Container>
  );
}

export default Messages;