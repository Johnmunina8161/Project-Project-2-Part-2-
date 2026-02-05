const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');
const { ensureAuth } = require('./auth');

// Public route
router.get('/', controller.getStudents);

// Protected routes
router.post('/', ensureAuth, controller.createStudent);
router.put('/:id', ensureAuth, controller.updateStudent);
router.delete('/:id', ensureAuth, controller.deleteStudent);

module.exports = router;
