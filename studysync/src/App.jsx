import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/groups" element={<StudyGroups />} />
        <Route path="/resources" element={<ResourceLibrary />} />
        <Route path="/events" element={<EventCalendar />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;