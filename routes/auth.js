const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock database - In real application, use a proper database
const users = [
    {
        id: '2025M0701',
        name: 'Catamin, Mark Justine G.',
        role: 'admin',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // admin123
    },
    {
        id: '2025M0665',
        name: 'Villasor, Kirk Lawrence T.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0716',
        name: 'Drilon, James Carl G.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0721',
        name: 'Mesina, Ma. Clarisse F.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0718',
        name: 'Atando, Daryl James E.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0678',
        name: 'Deocampo, James Clifford C.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0699',
        name: 'Agrete, Zhanin May A.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0684',
        name: 'Sabale, Jennylla Vyien B.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0658',
        name: 'Tamayo, Alijah Noah V.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0697',
        name: 'Villamucho, Ivan Reb T.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0657',
        name: 'Norbe, Miguel S.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0681',
        name: 'Mantac, Robert Aaron A.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0660',
        name: 'Fines, Charles Albert B.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0662',
        name: 'Hervas, Christine Joy D.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0712',
        name: 'Sales, Ezekiel Dominic J.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0666',
        name: 'Pu-od, Lovelyn',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0700',
        name: 'Grijalvo, Phlowie Gweyn S.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0713',
        name: 'Rosal, John Dave S.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0661',
        name: 'De la Peña, Glyza Mae C.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0689',
        name: 'Jacbang, Ruzzel Ann A.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0695',
        name: 'Kent, Gigabalen T.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M1652',
        name: 'Loreno, Queeny Rose',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0715',
        name: 'Luceño, Jasmine Kate S.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M1170',
        name: 'Agulto, Rench N.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0664',
        name: 'Geonanga, Adrianna Loraine H.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0692',
        name: 'Tundag, Kent Aldrich S.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0722',
        name: 'Emano, Ana Juliana Terese D.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0291',
        name: 'Auditor, Diosylle Niña Therese R.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0659',
        name: 'Anico, Kyle Christopher A.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    },
    {
        id: '2025M0663',
        name: 'Engalgado, Rashzed John E.',
        role: 'student',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // student123
    }
];

// Mock subjects data
const subjects = {
    'first_year_first_semester': [
        { code: 'BA 236', name: 'Organization and Management Concepts', lec: 3, lab: 0, units: 3 },
        { code: 'CC 201', name: 'Introduction to Computing', lec: 2, lab: 1, units: 3 },
        { code: 'CC 202', name: 'Computer Programming 1', lec: 2, lab: 1, units: 3 },
        { code: 'CWTS 101', name: 'Civic Welfare Training Service 1', lec: 3, lab: 0, units: 3 },
        { code: 'LTS 101', name: 'Literacy Training Service 1', lec: 3, lab: 0, units: 3 },
        { code: 'MTH 101', name: 'Mathematics in the Modern World', lec: 3, lab: 0, units: 3 },
        { code: 'NSTP 101', name: 'National Service Training Program 1', lec: 3, lab: 0, units: 3 },
        { code: 'PATHFIT 1', name: 'Movement Competency Training', lec: 2, lab: 0, units: 2 },
        { code: 'PSY 110', name: 'Understanding the Self', lec: 3, lab: 0, units: 3 },
        { code: 'ROTC 101', name: 'Reserved Officer Training Corps 1', lec: 3, lab: 0, units: 3 },
        { code: 'SS 110', name: 'Readings in Philippine History', lec: 3, lab: 0, units: 3 }
    ],
    'first_year_second_semester': [
        { code: 'CC 203', name: 'Computer Programming 2', lec: 2, lab: 1, units: 3 },
        { code: 'CIS 201', name: 'Fundamentals of Information System', lec: 2, lab: 1, units: 3 },
        { code: 'CIS 202', name: 'Web Development', lec: 2, lab: 1, units: 3 },
        { code: 'CWTS 102', name: 'Civic Welfare Training Service 2', lec: 3, lab: 0, units: 3 },
        { code: 'ENG 110', name: 'Purposive Communication', lec: 3, lab: 0, units: 3 },
        { code: 'LTS 102', name: 'Literacy Training Service 2', lec: 3, lab: 0, units: 3 },
        { code: 'NSCI 110', name: 'Science, Technology and Society', lec: 3, lab: 0, units: 3 },
        { code: 'NSTP 102', name: 'National Service Training Program 2', lec: 3, lab: 0, units: 3 },
        { code: 'PATHFIT 2', name: 'Exercise-Based Fitness Activities', lec: 2, lab: 0, units: 2 },
        { code: 'ROTC 102', name: 'Reserved Officer Training Corps 2', lec: 3, lab: 0, units: 3 },
        { code: 'SS 117', name: 'Living in the IT Era', lec: 3, lab: 0, units: 3 }
    ],
    'second_year_first_semester': [
        { code: 'ACTG 201A', name: 'Fundamentals of Accounting', lec: 3, lab: 0, units: 3 },
        { code: 'CC 204', name: 'Data Structures and Algorithms', lec: 2, lab: 1, units: 3 },
        { code: 'CIS 203', name: 'IT Infrastructure and Network Technologies', lec: 2, lab: 1, units: 3 },
        { code: 'CIS 216', name: 'Business Intelligence', lec: 2, lab: 1, units: 3 },
        { code: 'HUM 110', name: 'Art Appreciation', lec: 3, lab: 0, units: 3 },
        { code: 'PATHFIT 3', name: 'Menu of Dance, Sports, Martial Arts, Group Exercise, Outdoor and Adventure Activities', lec: 2, lab: 0, units: 2 },
        { code: 'SS 111', name: 'The Contemporary World', lec: 3, lab: 0, units: 3 },
        { code: 'SS 112', name: 'Ethics', lec: 3, lab: 0, units: 3 }
    ],
    'second_year_second_semester': [
        { code: 'BA 205', name: 'Financial Management', lec: 3, lab: 0, units: 3 },
        { code: 'CC 205', name: 'Information Management', lec: 2, lab: 1, units: 3 },
        { code: 'CC 206', name: 'Applications Development and Emerging Technologies', lec: 2, lab: 1, units: 3 },
        { code: 'CIS 207', name: 'Quantitative Methods', lec: 3, lab: 0, units: 3 },
        { code: 'CIT 205A', name: 'Human Computer Interaction', lec: 2, lab: 1, units: 3 },
        { code: 'ENG 111A', name: 'Reading Visual Art', lec: 3, lab: 0, units: 3 },
        { code: 'PATHFIT 4', name: 'Menu of Dance, Sports, Martial Arts, Group Exercise, Outdoor and Adventure Activities', lec: 2, lab: 0, units: 2 }
    ]
};

// Mock grades data
const grades = {};

router.post('/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        
        // Find user by ID
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(400).render('login', { 
                title: 'Login - WVSU-BSIS EduTrack', 
                error: 'Invalid user ID or password' 
            });
        }
        
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).render('login', { 
                title: 'Login - WVSU-BSIS EduTrack', 
                error: 'Invalid user ID or password' 
            });
        }
        
        // Store user info in session
        req.session.user = {
            id: user.id,
            name: user.name,
            role: user.role
        };
        
        // Redirect based on role
        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/student/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { 
            title: 'Login - WVSU-BSIS EduTrack', 
            error: 'Server error' 
        });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

module.exports = { router, users, subjects, grades };