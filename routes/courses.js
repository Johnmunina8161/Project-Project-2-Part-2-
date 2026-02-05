const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController');
const { ensureAuth } = require('./auth'); // import the middleware

// Public route
router.get('/', controller.getCourses);

// Protected routes
router.post('/', ensureAuth, controller.createCourse);
router.put('/:id', ensureAuth, controller.updateCourse);
router.delete('/:id', ensureAuth, controller.deleteCourse);

module.exports = router;
