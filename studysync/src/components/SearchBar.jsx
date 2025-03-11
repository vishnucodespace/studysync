import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <>
      <TextField
        label="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={() => onSearch(query)}>
        Search
      </Button>
    </>
  );
}

export default SearchBar;