const express = require('express');
const bcrypt = require('bcryptjs');
const { users, subjects, grades } = require('./auth');
const router = express.Router();

// Middleware to check if user is student
const isStudent = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'student') {
        return res.redirect('/login');
    }
    next();
};

// Student dashboard
router.get('/dashboard', isStudent, (req, res) => {
    // Get the logged-in student
    const student = users.find(u => u.id === req.session.user.id);
    
    res.render('student/dashboard', { 
        title: 'Student Dashboard - WVSU-BSIS EduTrack',
        user: req.session.user,
        student: student,
        subjects: subjects
    });
});

// View own subjects
router.get('/subjects', isStudent, (req, res) => {
    const student = users.find(u => u.id === req.session.user.id);
    
    res.render('student/subjects', { 
        title: 'My Subjects - WVSU-BSIS EduTrack',
        user: req.session.user,
        student: student,
        subjects: subjects
    });
});

// View grades
router.get('/grades', isStudent, (req, res) => {
    const student = users.find(u => u.id === req.session.user.id);
    
    res.render('student/grades', { 
        title: 'My Grades - WVSU-BSIS EduTrack',
        user: req.session.user,
        student: student,
        subjects: subjects,
        grades: grades
    });
});

// Change password page
router.get('/change-password', isStudent, (req, res) => {
    res.render('student/change-password', { 
        title: 'Change Password - WVSU-BSIS EduTrack',
        user: req.session.user,
        error: null,
        success: null
    });
});

// Handle password change
router.post('/change-password', isStudent, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Find the user
    const userIndex = users.findIndex(u => u.id === req.session.user.id);
    if (userIndex === -1) {
        return res.render('student/change-password', { 
            title: 'Change Password - WVSU-BSIS EduTrack',
            user: req.session.user,
            error: 'User not found',
            success: null
        });
    }
    
    const user = users[userIndex];
    
    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.render('student/change-password', { 
            title: 'Change Password - WVSU-BSIS EduTrack',
            user: req.session.user,
            error: 'Current password is incorrect',
            success: null
        });
    }
    
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
        return res.render('student/change-password', { 
            title: 'Change Password - WVSU-BSIS EduTrack',
            user: req.session.user,
            error: 'New passwords do not match',
            success: null
        });
    }
    
    // Hash new password and update
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    users[userIndex].password = hashedPassword;
    
    res.render('student/change-password', { 
        title: 'Change Password - WVSU-BSIS EduTrack',
        user: req.session.user,
        error: null,
        success: 'Password updated successfully!'
    });
});

// Generate personal report
router.get('/reports/personal', isStudent, (req, res) => {
    const student = users.find(u => u.id === req.session.user.id);
    
    res.render('student/personal-report', { 
        title: 'Personal Report - WVSU-BSIS EduTrack',
        user: req.session.user,
        student: student,
        subjects: subjects
    });
});

module.exports = router;