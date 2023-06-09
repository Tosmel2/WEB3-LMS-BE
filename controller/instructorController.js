import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";  
// import registerValidation from "../validation/register.js";
import generateToken from "../utilis/generateToken.js";
import {sendEmail} from "../utilis/sendEmail.js";
import loginInstructorValidation from "../validation/loginInstructor.js";
import crypto from "crypto";
import Instructor from "../model/Instructor.js";

dotenv.config();

// Register for Instructors
export const registerInstructor = async (req, res) => {
  try {
    const { lastname, firstname, email, password } = req.body;

    // Check if instructor already exists
    const instructor = await Instructor.findOne({ email });
    if (instructor) {
      return res.status(400).json({ msg: "Instructor already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const companyId = Math.floor(Math.random() * 90000) + 10000;

      const newInstructor = new Instructor({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        companyId,
      });

      const savedInstructor = await newInstructor.save();

      // Generate JWT token and send response
      const token = jwt.sign(
        { instructorId: savedInstructor._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ token, user: savedInstructor });

      // // Send email after 12 hours
      // setTimeout(() => {
      //   sendEmail(savedInstructor.email, savedInstructor.companyId);
      // }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
      // }

      // Send email after 12 hours
      setTimeout(() => {
        sendEmail(savedInstructor.email, savedInstructor.companyId);
      }, 1500); // 15sec in milliseconds
      }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const loginInstructor = async (req, res) => {
  try {
    const { companyId, password } = req.body;

    // Check if the user exists
    const instructor = await Instructor.findOne({ companyId });

    if (!instructor) {
      return res.status(400).send("Company ID is invalid");
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, instructor.password);
    if (!validPassword) {
      return res.status(400).send("Password is invalid");
    } else {
      const token = jwt.sign(
        { instructorId: instructor._id },
        process.env.JWT_SECRET
      );

      res.json({
        status: "success",
        data: {
          firstname: instructor.firstname,
          lastname: instructor.lastname,
          email: instructor.email,
          token: token,
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};




// // Email sending

// const sendEmail = async (to, companyId) => {
//   // console.log(process.env.EMAIL_USERNAME)
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     // service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USERNAME,
//     to: to,
//     subject: "AYA POD5 WEB3 LMS",
//     text: `Your Company ID is: ${companyId}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.messageId);
//       }
//     });
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.log("Error sending email:", error);
//   }
// };


// export const registerInstructor = async (req, res) => {
//     // const { error } = registerValidation.validate(req.body);
//     // if (error) {
//     //   return res.status(400).send(error.details[0].message);
//     // }
//     try {
//       const { lastname, firstname, email, password, role} = req.body;
  
//       // Check if user already exists
//       const instructor = await Instructor.findOne({ email });
//     //   if (role !== 'instructor') return res.status(400).send('Access denied');
//       const companyId = Math.floor(Math.random() * 90000) + 10000;
//       if (instructor) {
//         return res.status(400).json({ msg: "Instructor already exists" });
//         // Hash password and save user
//       } else {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
  
//         const instructor = new Instructor({
//           firstname,
//           lastname,
//           email,
//           password: hashedPassword,
//           companyId // Get company ID from request body
//         });
       
//         const savedInstructor = await instructor.save();
  
//         // Generate JWT token and send response
//         const token = jwt.sign(
//           { instructorId: savedInstructor._id },
//           process.env.JWT_SECRET
//         );
//         res.status(201).json({ token, user: savedInstructor });
//       }
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  
//   //Login for Instructors
//   export const loginInstructor = async (req, res) => {
//     // Validate the request body using Joi
//     // const { error } = loginInstructorValidation.validate(req.body);
//     // if (error) {
//     //   return res.status(400).send(error.details[0].message);
//     // }
  
//     // Check if the user exists
//     // const { companyId, password } = req.body;
//     // const instructor = await Instructor.findOne({ companyId, role: "instructor"});
//     try {
//       // Check if the user exists
//     const { companyId, password } = req.body;
//     const instructor = await Instructor.findOne({ companyId, role: "instructor"});
//       if (!instructor) {
//         return res.status(400).send("Company ID is invalid");
//       }

//       const token = jwt.sign(
//         { companyId: instructor.companyId, id: instructor._id },
//         process.env.JWT_SECRET
//       );
//       // Check if the user is an instructor
//     //   if (role !== 'instructor') return res.status(400).send('Access denied');
  
//       // Check if the password is correct
//       const validPassword = await bcrypt.compare(password, instructor.password);
//       if (!validPassword) {
//         return res.status(400).send("Password is invalid");

//       // const token = jwt.sign(
//       //   { companyId: instructor.companyId, id: instructor._id },
//       //   process.env.JWT_SECRET
//       // );

//       } else {
//         res.json({
//           status: "success",
//           data: {
//             firstname: instructor.firstname,
//             lastname: instructor.lastname,
//             email: instructor.email,
//             token: token
//             // token: generateToken(instructor.id)
//           }
//         });
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


  
  // Forgot password
export const forgotPasswordInstructor = async (req, res, next) => {
    try {
      const instructor = await Instructor.findOne({ email: req.body.email });
  
      if (!instructor) {
        return res.status(404).json({ error: "Instructor not found" });
      }
  
      const resetToken = crypto.randomBytes(20).toString("hex");
  
      instructor.resetPasswordToken = resetToken;
      // user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour
      await instructor.save();
  
      // TODO: Send password reset email with resetToken included
  
      res.status(200).json({
        message: "Password reset email sent",
        token: resetToken
      });
    } catch (err) {
      next(err);
    }
  };
  
  // Reset password
  export const resetPasswordInstructor = async (req, res, next) => {
    const {password} = req.body
    try {
      const instructor = await Instructor.findOne({
        resetPasswordToken: req.params.token
        // resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!instructor) {
        return res.status(400).json({ error: "Invalid or expired token" });
        
      } 
      else {
        const salt = await bcrypt.genSalt(10);
          const passwordhash = await bcrypt.hash(password, salt);
          instructor.password = passwordhash;
          instructor.resetPasswordToken = null;
        // user.resetPasswordTokenExpires = null;
        await instructor.save();
  
        res.status(200).json({ message: "Password reset successful" });
      }
    } catch (err) {
      next(err);
    }
  };
//   // Get all users (requires admin role)
// export const getAllUsers = async (req, res) => {
//     try {
//       const users = await User.find({});
//       res.status(200).json({ users });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Unable to get all users." });
//     }
//   };
  
//   // Get a single user by ID (requires admin role)
//   export const getUserById = async (req, res) => {
//     try {
//       // const token = obtainToken(req)
//       // // console.log(token);
//       const user = await User.findById(req.userAuth);
//       if (!user) {
//         return res.status(404).json({ message: "User not founds." });
//       }
//       res.status(200).json({ user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Unable to get user by ID." });
//     }
//   };
  
  // Update a user by ID 
  export const updateUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const { username,fullname, aboutYou, profession,interest, email } = req.body;
  
      await User.findOneAndUpdate(
        { _id: id },
        { username,fullname, aboutYou, profession,interest, email },
        { useFindAndModify: false }
      );
  
      res.json({ message: "the user has been updated successfully" });
    } catch (error) {
      console.log(error.message);
    }
  };