const express = require('express');
const { users, subjects, grades } = require('./auth');
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

// Admin dashboard
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard', { 
        title: 'Admin Dashboard - WVSU-BSIS EduTrack',
        user: req.session.user,
        students: users.filter(u => u.role === 'student'),
        subjects: subjects
    });
});

// View all students
router.get('/students', isAdmin, (req, res) => {
    res.render('admin/students', { 
        title: 'All Students - WVSU-BSIS EduTrack',
        user: req.session.user,
        students: users.filter(u => u.role === 'student')
    });
});

// View subjects
router.get('/subjects', isAdmin, (req, res) => {
    res.render('admin/subjects', { 
        title: 'Subjects - WVSU-BSIS EduTrack',
        user: req.session.user,
        subjects: subjects
    });
});

// Manage subjects (for adding/updating semesters)
router.get('/manage-subjects', isAdmin, (req, res) => {
    res.render('admin/manage-subjects', { 
        title: 'Manage Subjects - WVSU-BSIS EduTrack',
        user: req.session.user,
        subjects: subjects
    });
});

// Grades management
router.get('/grades', isAdmin, (req, res) => {
    res.render('admin/grades', { 
        title: 'Grades Management - WVSU-BSIS EduTrack',
        user: req.session.user,
        students: users.filter(u => u.role === 'student'),
        subjects: subjects,
        grades: grades
    });
});

// Generate class report
router.get('/reports/class', isAdmin, (req, res) => {
    res.render('admin/class-report', { 
        title: 'Class Report - WVSU-BSIS EduTrack',
        user: req.session.user,
        students: users.filter(u => u.role === 'student'),
        subjects: subjects
    });
});

module.exports = router;