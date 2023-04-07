import mongoose from 'mongoose'

// Define user schema
const userRoleSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    profession: {
      type: String,
    },
    interests: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    // companyName: { type: String, required: true, lowercase: true },
    companyName: { type: String },
    businessType: {
      type: String,
      enum: [],
    },
    address: [
      {
        address: { type: String },
        state: { type: String },
        country: { type: String },
      },
    ],
    noOfEmployee: {
      type: Number,
    },
    registrationNo: {
      type: Number,
    },

    role: {
      type: String,
      enum: ['superuser', 'admin', 'instructor', 'student'],
      default: 'student',
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    views: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } },
)

// Create user model
const User = mongoose.model('User', userRoleSchema)

export default User
