import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext'; // Path is correct assuming src/pages/ to src/contexts/

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulate frontend-only authentication
    if (email && password) {
      // Mock successful login
      localStorage.setItem('token', 'mock-token'); // Simulate storing a token
      login(); // Update AuthContext's isAuthenticated to true
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Please enter both email and password');
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
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            }}
          >
            Login
          </Typography>
          {error && (
            <Typography
              variant="body2"
              sx={{ color: '#FF6B6B', textAlign: 'center', mb: 2 }}
            >
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
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
                <LoginIcon sx={{ mr: 1 }} /> Login
              </Button>
            </motion.div>
          </form>
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: 'center', color: '#A0AEC0' }}
          >
            Don’t have an account?{' '}
            <Box
              component="a"
              href="/register"
              sx={{ color: '#00D4FF', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Register
            </Box>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Login;