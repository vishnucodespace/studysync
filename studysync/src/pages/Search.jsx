import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search as SearchIcon, PersonAdd } from '@mui/icons-material'; // Added PersonAdd for follow
import apiCall from '../utils/api';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // Added for navigation

  const handleSearch = async () => {
    console.log('Searching for:', query);
    if (query.trim()) {
      try {
        const data = await apiCall('/api/search', 'POST', { query });
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        setResults([
          { id: 1, type: 'user', name: 'Jane Doe', description: 'CS Student' },
          { id: 2, type: 'group', name: 'CS Study Group', description: 'Computer Science enthusiasts' },
          { id: 3, type: 'event', name: 'Hackathon 2025', description: 'Annual coding competition' },
        ]);
      }
    }
  };

  // Added follow handler
  const handleFollow = async (userId) => {
    try {
      await apiCall(`/api/users/${userId}/follow`, 'POST');
      setResults(results.map(r => r.id === userId && r.type === 'user' ? { ...r, followed: true } : r));
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  // Added view profile handler
  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Container
      maxWidth="lg"
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
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
        >
          Search
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            mb: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            label="Search for users, groups, or events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: { sm: '500px' },
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
              variant="contained"
              onClick={handleSearch}
              sx={{
                background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
                '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                borderRadius: 2,
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                color: '#E2E8F0',
                minWidth: { sm: '150px' },
              }}
            >
              <SearchIcon sx={{ mr: 1 }} /> Search
            </Button>
          </motion.div>
        </Box>

        <Grid container spacing={3}>
          {results.map((result) => (
            <Grid item xs={12} sm={6} md={4} key={result.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: result.id * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))',
                    border: '2px solid rgba(107, 72, 255, 0.2)',
                    '&:hover': {
                      borderColor: '#00D4FF',
                      boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
                    },
                    height: '100%',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#00D4FF',
                        fontWeight: 'bold',
                        mb: 1,
                      }}
                    >
                      {result.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#A0AEC0',
                        mb: 1,
                      }}
                    >
                      {result.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#6B48FF',
                        fontWeight: 'bold',
                      }}
                    >
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </Typography>
                    {/* Added buttons for user results */}
                    {result.type === 'user' && (
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          sx={{ color: '#00D4FF', borderColor: '#00D4FF' }}
                          onClick={() => handleViewProfile(result.id)}
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ background: result.followed ? '#A0AEC0' : '#6B48FF' }}
                          onClick={() => handleFollow(result.id)}
                          disabled={result.followed}
                        >
                          <PersonAdd sx={{ mr: 1 }} /> {result.followed ? 'Following' : 'Follow'}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
          {results.length === 0 && query && (
            <Grid item xs={12}>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#A0AEC0',
                  mt: 2,
                  fontStyle: 'italic',
                }}
              >
                No results found for "{query}".
              </Typography>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Search;