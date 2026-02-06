const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController'); // Ton contrôleur de cours
const { ensureAuth } = require('./auth'); // Importe le middleware

// GET est public
router.get('/', controller.getCourses);

// POST est protégé (Critère 5)
router.post('/', ensureAuth, controller.createCourse);

module.exports = router;