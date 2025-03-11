import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

function Search() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // TODO: Implement search logic
    console.log('Searching for:', query);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Search</Typography>
      <TextField
        label="Search users, groups, jobs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Container>
  );
}

export default Search;