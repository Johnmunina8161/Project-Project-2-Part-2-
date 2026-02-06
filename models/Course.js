const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController'); //  course contrôler
const { ensureAuth } = require('./auth'); // Import middleware

// GET est public
router.get('/', controller.getCourses);

// POST protected 
router.post('/', ensureAuth, controller.createCourse);

module.exports = router;