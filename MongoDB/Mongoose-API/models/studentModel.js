import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  value: {
    type: Number,
    required: true,
    min: 0,
  },
  lastModified: { type: Date, default: new Date() },
  // id: { type: mongoose.ObjectId },
});

const studentModel = mongoose.model('student', studentSchema, 'student');

export { studentModel };
