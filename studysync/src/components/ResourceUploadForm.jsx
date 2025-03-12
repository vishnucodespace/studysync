import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function ResourceUploadForm({ onUpload }) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onUpload(trimmedTitle);
      setTitle('');
    }
  };

  return (
    <>
      <TextField
        label="Resource Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            background: '#1A1A2E', // Dark background
            color: '#E2E8F0', // Light text
            '& fieldset': {
              borderColor: '#6B48FF', // Purple border
            },
            '&:hover fieldset': {
              borderColor: '#00D4FF', // Cyan on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00D4FF', // Cyan when focused
            },
          },
          '& .MuiInputLabel-root': {
            color: '#E2E8F0', // Light label
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!title.trim()} // Disable if title is empty or whitespace
        sx={{
          mt: 2, // Margin top for spacing
          background: 'linear-gradient(45deg, #6B48FF, #00D4FF)', // Gradient background
          color: '#FFFFFF', // White text
          '&:hover': {
            background: 'linear-gradient(45deg, #00D4FF, #6B48FF)', // Reverse gradient on hover
          },
          '&.Mui-disabled': {
            background: '#4A4A6A', // Dim background when disabled
            color: '#A0AEC0', // Dim text when disabled
          },
        }}
      >
        Upload
      </Button>
    </>
  );
}

export default ResourceUploadForm;