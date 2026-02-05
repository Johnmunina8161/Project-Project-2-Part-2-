const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  credits: { type: Number, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
