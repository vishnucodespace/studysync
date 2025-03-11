import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent } from '@mui/material';

function StudyGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // TODO: Fetch groups from backend
    setGroups([
      { id: 1, name: 'CS Study Group', description: 'For computer science students.' },
      { id: 2, name: 'Math Club', description: 'Math enthusiasts unite!' },
    ]);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Study Groups</Typography>
      {groups.map((group) => (
        <Card key={group.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{group.name}</Typography>
            <Typography>{group.description}</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
              Join Group
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default StudyGroups;