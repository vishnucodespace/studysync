import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Card, CardContent } from '@mui/material';

function JobBoard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: Fetch jobs from backend
    setJobs([
      { id: 1, title: 'Software Engineer Intern', company: 'TechCorp' },
      { id: 2, title: 'Data Analyst', company: 'DataInc' },
    ]);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Job Board</Typography>
      {jobs.map((job) => (
        <Card key={job.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{job.title}</Typography>
            <Typography>{job.company}</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 1 }}>
              Apply
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default JobBoard;