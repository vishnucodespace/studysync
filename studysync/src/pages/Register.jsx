import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiCall from '../utils/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await apiCall('/api/auth/register', 'POST', { email, password, name });
      login(data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        background: '#1A1A2E',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            p: 4,
            border: '1px solid rgba(107, 72, 255, 0.2)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Register
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: '#FF6B6B', textAlign: 'center', mb: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: '#00D4FF' },
                  '&.Mui-focused fieldset': { borderColor: '#6B48FF' },
                },
                '& .MuiInputLabel-root': { color: '#A0AEC0' },
                '& .MuiInputBase-input': { color: '#E2E8F0' },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: '#00D4FF' },
                  '&.Mui-focused fieldset': { borderColor: '#6B48FF' },
                },
                '& .MuiInputLabel-root': { color: '#A0AEC0' },
                '& .MuiInputBase-input': { color: '#E2E8F0' },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  '& fieldset': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: '#00D4FF' },
                  '&.Mui-focused fieldset': { borderColor: '#6B48FF' },
                },
                '& .MuiInputLabel-root': { color: '#A0AEC0' },
                '& .MuiInputBase-input': { color: '#E2E8F0' },
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                  '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                  borderRadius: 2,
                  fontWeight: 'bold',
                  color: '#E2E8F0',
                }}
              >
                Register
              </Button>
            </motion.div>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#A0AEC0' }}>
            Already have an account?{' '}
            <Box component="a" href="/login" sx={{ color: '#00D4FF', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Login
            </Box>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Register;