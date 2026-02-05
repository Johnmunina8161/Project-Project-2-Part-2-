const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');
const ensureAuth = require('../middleware/auth');

router.get('/', controller.getStudents);
router.post('/', ensureAuth, controller.createStudent);
router.put('/:id', ensureAuth, controller.updateStudent);
router.delete('/:id', ensureAuth, controller.deleteStudent);

module.exports = router;
