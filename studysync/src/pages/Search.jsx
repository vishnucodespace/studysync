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

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // TODO: Implement search logic with backend
    console.log('Searching for:', query);
    // Mock results for now
    setResults([
      { id: 1, type: 'user', name: 'Jane Smith', detail: 'CS Student' },
      { id: 2, type: 'group', name: 'CS Study Group', detail: 'Computer Science Enthusiasts' },
      { id: 3, type: 'job', name: 'Software Intern', detail: 'TechCorp' },
    ]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #4caf50, #81c784)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Search StudySync
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: 'center',
            background: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            p: 2,
            mb: 4,
            border: '2px solid #e0e0e0',
            '&:hover': { borderColor: '#4caf50' },
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
                '&:hover fieldset': { borderColor: '#4caf50' },
                '&.Mui-focused fieldset': { borderColor: '#ff9800' },
              },
            }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSearch}
              sx={{
                background: '#ff9800',
                '&:hover': { background: '#f57c00' },
                borderRadius: 2,
                py: 1.5,
                px: 4,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                minWidth: { sm: '150px' },
              }}
            >
              Search
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
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                      background: 'white',
                      border: '2px solid #e0e0e0',
                      '&:hover': {
                        borderColor: '#4caf50',
                        boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#4caf50',
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {result.name}
                      </Typography>
                      <Typography sx={{ color: '#757575' }}>
                        {result.detail}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#ff9800', fontStyle: 'italic' }}
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
          <Typography sx={{ textAlign: 'center', color: '#757575', mt: 2 }}>
            No results found for "{query}".
          </Typography>
        )}
      </motion.div>
    </Container>
  );
}

export default Search;