import React from 'react';
import { Typography, Container } from '@mui/material';

function Messages() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Messages</Typography>
      <Typography>Coming soon... (Real-time messaging with Socket.io)</Typography>
    </Container>
  );
}

export default Messages;