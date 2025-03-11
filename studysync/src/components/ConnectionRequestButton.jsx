import React, { useState } from 'react';
import { Button } from '@mui/material';

function ConnectionRequestButton() {
  const [requested, setRequested] = useState(false);

  return (
    <Button
      variant={requested ? 'contained' : 'outlined'}
      color="primary"
      onClick={() => setRequested(!requested)}
    >
      {requested ? 'Requested' : 'Connect'}
    </Button>
  );
}

export default ConnectionRequestButton;