const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  year: { type: Number, required: true },
  gpa: { type: Number, required: true },
  enrolled: { type: Boolean, required: true }
});

module.exports = mongoose.model('Student', StudentSchema);
