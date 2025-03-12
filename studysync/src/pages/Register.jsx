// src/pages/Register.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PersonAdd } from '@mui/icons-material';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add backend registration logic
    navigate('/dashboard');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        background: '#1A1A2E', // Night theme base
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
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
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
              background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Matches Navbar
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            }}
          >
            Register
          </Typography>
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
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: '#A0AEC0' }}>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#E2E8F0',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(107, 72, 255, 0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00D4FF' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6B48FF' },
                }}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
              </Select>
            </FormControl>
            {role === 'student' && (
              <>
                <TextField
                  label="College"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
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
                  label="Graduation Year"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
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
              </>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Theme gradient
                  '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                  borderRadius: 2,
                  fontWeight: 'bold',
                  color: '#E2E8F0',
                }}
              >
                <PersonAdd sx={{ mr: 1 }} /> Register
              </Button>
            </motion.div>
          </form>
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: 'center', color: '#A0AEC0' }}
          >
            Already have an account?{' '}
            <Box
              component="a"
              href="/login"
              sx={{ color: '#00D4FF', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Login
            </Box>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Register;