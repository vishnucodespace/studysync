import React from 'react';
import { Typography } from '@mui/material';

function Comment({ comment }) {
  return (
    <Typography sx={{ ml: 2 }}>{comment.text}</Typography>
  );
}

export default Comment;