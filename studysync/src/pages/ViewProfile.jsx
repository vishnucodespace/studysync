import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import apiCall from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function ViewProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const data = await apiCall(`/api/user/${id}`);
        setProfile(data);
        setFollowersCount(data.followers?.length || 0);
        setFollowingCount(data.following?.length || 0);
        console.log('Profile data:', data); // Debug log
      } catch (error) {
        console.error('Fetch profile error:', error);
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, [id, user, navigate]);

  const handleFollow = async () => {
    try {
      const response = await apiCall(`/api/user/${id}/follow`, 'POST');
      setFollowersCount(response.followers);
      setFollowingCount(response.following);
    } catch (error) {
      console.error('Follow error:', error);
    }
  };

  const handleMessage = () => {
    navigate('/messages', { state: { recipientId: id } });
  };

  if (error) return <Typography sx={{ color: '#FF6B6B' }}>{error}</Typography>;
  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4, background: '#1A1A2E', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ color: '#00D4FF', mb: 2 }}>
          {profile.name}'s Profile
        </Typography>
        <Card sx={{ background: 'rgba(34, 34, 54, 0.9)', p: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: '#00D4FF', mr: 2 }}>{profile.name[0]}</Avatar>
              <Box>
                <Typography sx={{ color: '#E2E8F0' }}>{profile.name}</Typography>
                <Typography sx={{ color: '#A0AEC0' }}>Email: {profile.email}</Typography>
                <Typography sx={{ color: '#A0AEC0' }}>College: {profile.college || 'Not set'}</Typography>
                <Typography sx={{ color: '#A0AEC0' }}>
                  Followers: {followersCount} | Following: {followingCount}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={handleFollow} variant="contained" sx={{ background: '#6B48FF' }}>
                Follow
              </Button>
              <Button onClick={handleMessage} variant="outlined" sx={{ color: '#00D4FF' }}>
                Message
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="h6" sx={{ color: '#00D4FF', mt: 4 }}>
          Posts
        </Typography>
        {profile.posts?.length > 0 ? (
          profile.posts.map(post => (
            <Card key={post._id} sx={{ mt: 2, background: 'rgba(34, 34, 54, 0.9)', p: 2 }}>
              <CardContent>
                <Typography sx={{ color: '#E2E8F0' }}>{post.content}</Typography>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '8px' }} />
                )}
                <Typography sx={{ color: '#A0AEC0', mt: 1 }}>
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography sx={{ color: '#A0AEC0' }}>No posts yet.</Typography>
        )}
      </motion.div>
    </Container>
  );
}

export default ViewProfile;