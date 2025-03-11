import React, { useState } from 'react';
import { Button } from '@mui/material';

function JobApplyButton() {
  const [applied, setApplied] = useState(false);

  return (
    <Button
      variant={applied ? 'contained' : 'outlined'}
      color="secondary"
      onClick={() => setApplied(!applied)}
    >
      {applied ? 'Applied' : 'Apply'}
    </Button>
  );
}

export default JobApplyButton;