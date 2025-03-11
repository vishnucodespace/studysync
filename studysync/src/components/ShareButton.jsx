import React from 'react';
import { Button } from '@mui/material';

function ShareButton() {
  const handleShare = () => {
    // TODO: Implement share logic
    alert('Shared!');
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleShare}>
      Share
    </Button>
  );
}

export default ShareButton;