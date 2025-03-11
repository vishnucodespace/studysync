import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EduConnect
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Home</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/messages">Messages</Button>
        <Button color="inherit" component={Link} to="/groups">Groups</Button>
        <Button color="inherit" component={Link} to="/resources">Resources</Button>
        <Button color="inherit" component={Link} to="/events">Events</Button>
        <Button color="inherit" component={Link} to="/jobs">Jobs</Button>
        <Button color="inherit" component={Link} to="/search">Search</Button>
        <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;