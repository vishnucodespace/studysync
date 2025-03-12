import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Save, GitHub, LinkedIn, Twitter, PhotoCamera } from '@mui/icons-material';
import apiCall from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState(''); // New state for department, no default
  const [graduationYear, setGraduationYear] = useState('');
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        const data = await apiCall('/api/user/profile');
        setUser(data);
        setName(data.name || 'John Doe');
        setCollege(data.college || 'Karpagam College of Engineering'); // Default to Karpagam
        setDepartment(data.department || ''); // No default value if not provided
        setGraduationYear(data.graduationYear || '2027'); // Default to 2027
        setBio(data.bio || 'CS student passionate about AI and open-source.');
        setSocialLinks({
          github: data.github || 'https://github.com/johndoe',
          linkedin: data.linkedin || 'https://linkedin.com/in/johndoe',
          twitter: data.twitter || 'https://twitter.com/johndoe',
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setName('John Doe');
        setCollege('Karpagam College of Engineering'); // Fallback to Karpagam
        setDepartment(''); // No default value
        setGraduationYear('2027'); // Fallback to 2027
        setBio('CS student passionate about AI and open-source.');
        setSocialLinks({
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          twitter: 'https://twitter.com/johndoe',
        });
      }
    };
    fetchProfile();
  }, [user, setUser, navigate]);

  const handleSave = async () => {
    try {
      const updatedProfile = {
        name,
        college,
        department, // Include department in the update
        graduationYear,
        bio,
        ...socialLinks,
      };
      const data = await apiCall('/api/user/profile', 'PUT', updatedProfile);
      setUser({ ...user, ...data });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setIsEditing(false);
    }
  };

  const handlePost = async () => {
    if (!postContent.trim() && !postImage) return;
    const formData = new FormData();
    formData.append('content', postContent);
    if (postImage) formData.append('image', postImage);

    try {
      const newPost = await apiCall('/api/user/post', 'POST', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(prev => ({
        ...prev,
        posts: [...(prev.posts || []), newPost],
      }));
      setPostContent('');
      setPostImage(null);
      console.log('Post created:', newPost);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        background: '#1A1A2E',
        minHeight: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mr: { md: 3 },
                mb: { xs: 2, md: 0 },
                border: '3px solid #FFFFFF',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
              }}
            />
            <Box sx={{ color: '#E2E8F0', textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              <Typography variant="subtitle1">
                {college} {department ? `| ${department}` : ''} | Class of {graduationYear}
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton
                  component="a"
                  href={socialLinks.github}
                  target="_blank"
                  sx={{ color: '#E2E8F0', '&:hover': { color: '#00D4FF' } }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href={socialLinks.linkedin}
                  target="_blank"
                  sx={{ color: '#E2E8F0', '&:hover': { color: '#00D4FF' } }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  component="a"
                  href={socialLinks.twitter}
                  target="_blank"
                  sx={{ color: '#E2E8F0', '&:hover': { color: '#00D4FF' } }}
                >
                  <Twitter />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{ background: 'rgba(26, 26, 46, 0.9)', p: 3 }}>
            {isEditing ? (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="College"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="Graduation Year"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <TextField
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: '#00D4FF' },
                    },
                    '& .MuiInputLabel-root': { color: '#A0AEC0' },
                    '& .MuiInputBase-input': { color: '#E2E8F0' },
                  }}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                      '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                    }}
                  >
                    <Save sx={{ mr: 1 }} /> Save Profile
                  </Button>
                </motion.div>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>Name:</strong> {name}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>College:</strong> {college}
                </Typography>
                {department && (
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                    <strong>Department:</strong> {department}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>Graduation Year:</strong> {graduationYear}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
                  <strong>Bio:</strong> {bio}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ color: '#00D4FF', fontWeight: 'bold', mb: 1 }}>
                    Stats
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip label={`Posts: ${user?.posts?.length || 0}`} sx={{ background: '#6B48FF', color: '#E2E8F0' }} />
                    <Chip label={`Followers: ${user?.followers?.length || 0}`} sx={{ background: '#6B48FF', color: '#E2E8F0' }} />
                    <Chip label={`Following: ${user?.following?.length || 0}`} sx={{ background: '#6B48FF', color: '#E2E8F0' }} />
                  </Box>
                </Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                      '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                    }}
                  >
                    <Edit sx={{ mr: 1 }} /> Edit Profile
                  </Button>
                </motion.div>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Post Creation Section */}
        <Card
          sx={{
            mt: 4,
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#00D4FF', fontWeight: 'bold', mb: 2 }}>
              Create a Post
            </Typography>
            <TextField
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: '#00D4FF' },
                },
                '& .MuiInputBase-input': { color: '#E2E8F0' },
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton component="label" sx={{ color: '#00D4FF' }}>
                <PhotoCamera />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
              </IconButton>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={handlePost}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                    '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                  }}
                >
                  Post
                </Button>
              </motion.div>
            </Box>
            {postImage && (
              <Typography sx={{ color: '#A0AEC0', mt: 1 }}>
                Attached: {postImage.name}
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default Profile;