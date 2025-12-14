const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'wvsu-bsis-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');

// Routes
app.use('/auth', authRoutes.router);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home', { title: 'WVSU-BSIS EduTrack' });
});

// Login route
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login - WVSU-BSIS EduTrack', error: null });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, users: authRoutes.users, subjects: authRoutes.subjects, grades: authRoutes.grades };