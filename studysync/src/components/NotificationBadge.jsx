import React from 'react';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NotificationBadge({ count }) {
  return (
    <Badge badgeContent={count} color="secondary">
      <NotificationsIcon />
    </Badge>
  );
}

export default NotificationBadge;