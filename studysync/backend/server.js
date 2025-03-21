require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(require('cors')());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/events', require('./routes/events'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/search', require('./routes/search'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/posts', require('./routes/posts')); // New route

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));