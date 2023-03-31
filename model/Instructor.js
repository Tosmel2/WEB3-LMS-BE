import mongoose from "mongoose";

// Define user schema
const instructorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    
  },
  lastname: {
    type: String,
    required: true,
    
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
       
  },
  role: {
    type: String,
    enum: ['superuser', 'admin', 'instructor', 'student'],
    default: 'instructor'
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordTokenExpires: {
    type: Date,
    default: null
  }
},
{timestamps:true,
toJSON:{virtuals:true}
}
);

// Create user model
const Instructor = mongoose.model('Instructor', instructorSchema);


export default Instructor;