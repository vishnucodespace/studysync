import React, { useState } from 'react';
import { Button } from '@mui/material';

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      variant={liked ? 'contained' : 'outlined'}
      color="primary"
      onClick={() => setLiked(!liked)}
      sx={{ mr: 1 }}
    >
      {liked ? 'Liked' : 'Like'}
    </Button>
  );
}

export default LikeButton;