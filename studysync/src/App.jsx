import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import StudyGroups from './pages/StudyGroups';
import ResourceLibrary from './pages/ResourceLibrary';
import EventCalendar from './pages/EventCalendar';
import JobBoard from './pages/JobBoard';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import ViewProfile from './pages/ViewProfile'; // New
import Posts from './pages/Posts'; // New
import PrivateRoute from './components/PrivateRoute';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const particlesInit = async (main) => {
  console.log('Initializing particles');
  await loadFull(main);
};

function App() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register'];

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#6B48FF' },
      secondary: { main: '#00D4FF' },
      background: {
        default: '#1A1A2E',
        paper: 'rgba(34, 34, 54, 0.9)',
      },
      text: {
        primary: '#E2E8F0',
        secondary: '#A0AEC0',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            background: 'linear-gradient(135deg, rgba(34, 34, 54, 0.8), rgba(107, 72, 255, 0.2))',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 20px',
          },
        },
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: '#1A1A2E' },
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: ['#00D4FF', '#6B48FF'] },
              shape: { type: ['circle', 'star'] },
              opacity: { value: 0.7, random: { enable: true, minimumValue: 0.3 } },
              size: { value: { min: 1, max: 4 }, random: true },
              links: {
                enable: true,
                color: '#6B48FF',
                distance: 120,
                opacity: 0.5,
              },
              move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                outModes: { default: 'bounce' },
              },
              twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 } },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: true, mode: 'push' },
              },
              modes: {
                grab: { distance: 150, links: { opacity: 0.8 } },
                push: { quantity: 4 },
              },
            },
            detectRetina: true,
          }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/groups" element={<PrivateRoute><StudyGroups /></PrivateRoute>} />
            <Route path="/resources" element={<PrivateRoute><ResourceLibrary /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><EventCalendar /></PrivateRoute>} />
            <Route path="/jobs" element={<PrivateRoute><JobBoard /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/view-profile/:id" element={<PrivateRoute><ViewProfile /></PrivateRoute>} /> {/* New */}
            <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} /> {/* New */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;