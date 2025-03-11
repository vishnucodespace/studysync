// src/pages/EventCalendar.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material'; // Fixed import
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';

function EventCalendar() {
  const events = [
    { title: 'College Fest', date: '2025-03-15', backgroundColor: '#4caf50', borderColor: '#388e3c' },
    { title: 'Workshop', date: '2025-03-20', backgroundColor: '#ff9800', borderColor: '#f57c00' },
    { title: 'Hackathon', date: '2025-03-25', backgroundColor: '#4caf50', borderColor: '#388e3c' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          }}
        >
          Event Calendar
        </Typography>

        <Box
          sx={{
            background: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            p: 3,
          }}
        >
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            height="70vh"
            eventDisplay="block"
            eventTextColor="white"
            eventBorderColor="transparent"
          />
        </Box>
      </motion.div>
    </Container>
  );
}

// Custom render for event content
function renderEventContent(eventInfo) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        backgroundColor: eventInfo.event.backgroundColor,
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
        {eventInfo.event.title}
      </Typography>
    </motion.div>
  );
}

export default EventCalendar;