import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function ResourceUploadForm({ onUpload }) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    onUpload(title);
    setTitle('');
  };

  return (
    <>
      <TextField
        label="Resource Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Upload
      </Button>
    </>
  );
}

export default ResourceUploadForm;