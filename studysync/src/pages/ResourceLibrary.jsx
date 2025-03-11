import React, { useState } from 'react';
import { Container, Typography, Button, TextField, Card, CardContent } from '@mui/material';

function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState('');

  const handleUpload = () => {
    // TODO: Upload to backend
    setResources([...resources, { id: resources.length + 1, title: newResource }]);
    setNewResource('');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Resource Library</Typography>
      <TextField
        label="Resource Title"
        value={newResource}
        onChange={(e) => setNewResource(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mb: 2 }}>
        Upload
      </Button>
      {resources.map((resource) => (
        <Card key={resource.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>{resource.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default ResourceLibrary;