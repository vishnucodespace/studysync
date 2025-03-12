// src/pages/EventCalendar.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';

function EventCalendar() {
  const events = [
    { title: 'College Fest', date: '2025-03-15', backgroundColor: '#6B48FF', borderColor: '#5A3ECC' },
    { title: 'Workshop', date: '2025-03-20', backgroundColor: '#00D4FF', borderColor: '#00B8E6' },
    { title: 'Hackathon', date: '2025-03-25', backgroundColor: '#6B48FF', borderColor: '#5A3ECC' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, background: '#1A1A2E', minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #6B48FF, #00D4FF)',
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
            background: 'rgba(34, 34, 54, 0.9)',
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            p: 3,
            border: '1px solid rgba(107, 72, 255, 0.2)',
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
            eventTextColor="#E2E8F0"
            eventBorderColor="transparent"
            dayHeaderContent={({ date }) => (
              <Typography sx={{ color: '#00D4FF', fontWeight: 600, fontSize: '0.9rem' }}>
                {date.toLocaleString('default', { weekday: 'short' }).toUpperCase()}
              </Typography>
            )}
            dayCellContent={({ date }) => (
              <Typography sx={{ color: '#E2E8F0', fontSize: '1rem' }}>{date.getDate()}</Typography>
            )}
            // Custom styles for the calendar table
            customButtons={{
              prev: { text: '◄', click: (e) => e.currentTarget.parentElement.parentElement.querySelector('.fc-prev-button').click() },
              next: { text: '►', click: (e) => e.currentTarget.parentElement.parentElement.querySelector('.fc-next-button').click() },
              today: { text: 'Today', click: (e) => e.currentTarget.parentElement.parentElement.querySelector('.fc-today-button').click() },
            }}
            themeSystem="standard"
            // Inject custom CSS via sx prop on Box
          />
        </Box>
      </motion.div>
    </Container>
  );
}

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
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#E2E8F0' }}>
        {eventInfo.event.title}
      </Typography>
    </motion.div>
  );
}

// Inject custom styles via a styled component or global CSS
const calendarStyles = `
  .fc .fc-toolbar-title {
    color: #E2E8F0;
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, #6B48FF, #00D4FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .fc .fc-daygrid-day {
    background: rgba(34, 34, 54, 0.8);
    border: 1px solid rgba(107, 72, 255, 0.1);
  }
  .fc .fc-daygrid-day:hover {
    background: rgba(107, 72, 255, 0.1);
  }
  .fc .fc-day-other {
    background: rgba(26, 26, 46, 0.8);
    color: #A0AEC0;
  }
  .fc .fc-button {
    background: #6B48FF;
    border: none;
    color: #E2E8F0;
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
  }
  .fc .fc-button:hover {
    background: #00D4FF;
    color: #1A1A2E;
  }
  .fc .fc-button.fc-button-active {
    background: #00D4FF;
    color: #1A1A2E;
  }
  .fc .fc-daygrid-day-top {
    padding: 4px;
  }
  .fc .fc-daygrid-day-number {
    color: #E2E8F0;
  }
  .fc .fc-daygrid-day.fc-day-today {
    background: rgba(0, 212, 255, 0.2);
  }
`;

// Add styles globally (you can move this to a CSS file like src/index.css)
const styleSheet = document.createElement('style');
styleSheet.textContent = calendarStyles;
document.head.appendChild(styleSheet);

export default EventCalendar;