import React, { useState } from 'react';
import { Button } from '@mui/material';

function EventRSVPButton() {
  const [rsvped, setRsvped] = useState(false);

  return (
    <Button
      variant={rsvped ? 'contained' : 'outlined'}
      color="secondary"
      onClick={() => setRsvped(!rsvped)}
    >
      {rsvped ? 'RSVPed' : 'RSVP'}
    </Button>
  );
}

export default EventRSVPButton;