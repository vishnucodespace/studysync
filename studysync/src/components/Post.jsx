import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

function Post({ post }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{post.user.name}</Typography>
        <Typography>{post.content}</Typography>
        <LikeButton />
        <ShareButton />
      </CardContent>
    </Card>
  );
}

export default Post;