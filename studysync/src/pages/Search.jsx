// src/pages/Search.jsx
import React, { useState } from 'react';
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
import { Search as SearchIcon } from '@mui/icons-material';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    console.log('Searching for:', query);
    if (query.trim()) {
      setResults([
        { id: 1, type: 'user', name: 'Jane Smith', detail: 'CS Student' },
        { id: 2, type: 'group', name: 'CS Study Group', detail: 'Computer Science Enthusiasts' },
        { id: 3, type: 'job', name: 'Software Intern', detail: 'TechCorp' },
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        background: '#1A1A2E', // Night theme base
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
            background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Matches Navbar
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
          }}
        >
          Search CampusConnect
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
            p: 2,
            mb: 4,
            border: '2px solid rgba(107, 72, 255, 0.2)',
            '&:hover': { borderColor: '#00D4FF' },
          }}
        >
          <TextField
            label="Search users, groups, jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            variant="outlined"
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
              variant="contained"
              onClick={handleSearch}
              sx={{
                background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Theme gradient
                '&:hover': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)' },
                borderRadius: 2,
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#E2E8F0',
                minWidth: { sm: '150px' },
              }}
            >
              <SearchIcon sx={{ mr: 1 }} /> Search
            </Button>
          </motion.div>
        </Box>

        {/* Search Results */}
        {results.length > 0 && (
          <Grid container spacing={3}>
            {results.map((result) => (
              <Grid item xs={12} key={result.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: result.id * 0.1 }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                      background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.9), rgba(107, 72, 255, 0.3))', // Glassy night
                      border: '2px solid rgba(107, 72, 255, 0.2)',
                      '&:hover': {
                        borderColor: '#00D4FF',
                        boxShadow: '0 12px 24px rgba(0, 212, 255, 0.2)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#00D4FF', // Cyan title
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {result.name}
                      </Typography>
                      <Typography sx={{ color: '#A0AEC0' }}>
                        {result.detail}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6B48FF', fontStyle: 'italic' }}
                      >
                        {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
        {query && results.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: '#A0AEC0', mt: 2 }}>
            No results found for "{query}".
          </Typography>
        )}
      </motion.div>
    </Container>
  );
}

export default Search;