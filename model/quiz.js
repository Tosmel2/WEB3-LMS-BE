import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is needed'],
  },
  options: [
    {
      type: String,
      required: [true, 'Options are needed'],
    },
  ],
  correctOptions: {
    type: Number,
    required: [true, 'correct option is needed'],
  },
  explanation: {
    type: String,
    required: false,
  },
})

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)
const Quiz = mongoose.Model('Quiz', quizSchema)

export default Quiz
