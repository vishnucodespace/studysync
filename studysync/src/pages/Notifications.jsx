import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch notifications from backend
    setNotifications([
      { id: 1, message: 'Jane liked your post.' },
      { id: 2, message: 'New event added: College Fest.' },
    ]);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Notifications</Typography>
      {notifications.map((notification) => (
        <Card key={notification.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{notification.message}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Notifications;