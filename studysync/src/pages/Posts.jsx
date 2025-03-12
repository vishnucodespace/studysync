import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ThumbUp, Share } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import apiCall from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function Posts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const data = await apiCall('/api/posts');
        setPosts(data);
        console.log('Posts data:', data); // Debug log
      } catch (error) {
        console.error('Fetch posts error:', error);
        setError('Failed to load posts');
      }
    };
    fetchPosts();
  }, [user, navigate]);

  const handleLike = async (postId) => {
    try {
      const response = await apiCall(`/api/posts/${postId}/like`, 'POST');
      setPosts(prev =>
        prev.map(post =>
          post._id === postId ? { ...post, likes: response.likes, likedByUser: response.likedByUser } : post
        )
      );
    } catch (error) {
      console.error('Like post error:', error);
    }
  };

  const handleShare = (post) => {
    navigate('/messages', { state: { postContent: `${post.user.name}: ${post.content} ${post.imageUrl || ''}` } });
  };

  if (error) return <Typography sx={{ color: '#FF6B6B' }}>{error}</Typography>;

  return (
    <Container sx={{ mt: 4, background: '#1A1A2E', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ color: '#00D4FF', mb: 2 }}>
          Posts
        </Typography>
        {posts.length > 0 ? (
          posts.map(post => (
            <Card key={post._id} sx={{ mt: 2, background: 'rgba(34, 34, 54, 0.9)', p: 2 }}>
              <CardContent>
                <Typography sx={{ color: '#E2E8F0' }}>
                  <strong>{post.user.name}</strong>: {post.content}
                </Typography>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '8px' }} />
                )}
                <Typography sx={{ color: '#A0AEC0', mt: 1 }}>
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    onClick={() => handleLike(post._id)}
                    variant={post.likedByUser ? 'contained' : 'outlined'}
                    sx={{ color: '#00D4FF' }}
                  >
                    <ThumbUp /> {post.likes}
                  </Button>
                  <Button onClick={() => handleShare(post)} variant="outlined" sx={{ color: '#00D4FF' }}>
                    <Share /> Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography sx={{ color: '#A0AEC0' }}>No posts available.</Typography>
        )}
      </motion.div>
    </Container>
  );
}

export default Posts;