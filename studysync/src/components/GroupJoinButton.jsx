import React, { useState } from 'react';
import { Button } from '@mui/material';

function GroupJoinButton() {
  const [joined, setJoined] = useState(false);

  return (
    <Button
      variant={joined ? 'contained' : 'outlined'}
      color="secondary"
      onClick={() => setJoined(!joined)}
    >
      {joined ? 'Joined' : 'Join Group'}
    </Button>
  );
}

export default GroupJoinButton;