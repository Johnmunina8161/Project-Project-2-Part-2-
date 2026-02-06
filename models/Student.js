const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
  enrollmentDate: { type: String, required: true }, // Correspond à ta capture
  status: { type: String, required: true }         // Correspond à ta capture
});

module.exports = mongoose.model('Student', StudentSchema);