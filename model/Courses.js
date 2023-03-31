import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  courseThumbnailImage: {
    type: String,
  },
 coursePromotionalVideo: {
    type: String,
  },
  language: {
    type: String
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [
    {
      title: String,
      content: String,
    },
  ],
  materials: [
    {
      title: String,
      link: String,
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  isFree: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['New', 'In-progress', 'Completed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Course = mongoose.model('Course', CourseSchema)

export default Course