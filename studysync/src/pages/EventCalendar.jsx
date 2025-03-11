import React from 'react';
import { Container, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function EventCalendar() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Event Calendar</Typography>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'College Fest', date: '2023-11-15' },
          { title: 'Workshop', date: '2023-11-20' },
        ]}
      />
    </Container>
  );
}

export default EventCalendar;