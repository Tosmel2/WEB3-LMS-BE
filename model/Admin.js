import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"]
  },
  password: {
      type: String,
      required: [true, "Please enter your password"],
      default: "2023"
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
    required: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;



