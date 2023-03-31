import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import User from "../model/User.js";
import generateToken from "../utilis/generateToken.js";
const defaultPassword = "Admin123";
import crypto from "crypto";


// register an admin
export const adminRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await Admin.findOne({ email });

    if (findUser) {
      console.log(findUser);
      return res.json({
        status: "error",
        message: "Account Already Exists, Please login"
      });
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    res.json({
      status: "success",
      data: admin
      // message: "Admin account created successfully"
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
};
// admin login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await Admin.findOne({ email });

    if (!findUser) {
      res.json({
        status: "error",
        message: "Sorry you can not access this page"
      });
    }

    const passwordFound = await bcrypt.compare(password, findUser.password);
    if (!passwordFound) {
      res.json({
        status: "error",
        message: "Incorrect Password"
      });
    } else {
      res.json({
        status: "success",
        data: findUser,
        token:generateToken(findUser.id)
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
};


// change admin password
export const changePassword = async (req, res) => {
  const { password } = req.body;
  const { email } = req.params;

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.findOne({ email });

  try {
    await Admin.updateOne(
      admin,
      {
        $set: {
          password: hashedPassword
        }
      },
      {
        new: true
      }
    );

    admin.save();

    res.json({
      status: "success",
      message: "Password updated successfully"
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
};


// Forgot password
export const forgotPassword = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    admin.resetPasswordToken = resetToken;
    // admin.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour
    await admin.save();

    // TODO: Send password reset email with resetToken included

    res.status(200).json({
       message: 'Password reset email sent',
       token: resetToken
       

   });
  } catch (err) {
    next(err);
  }
};

// 


// Reset password
export const resetPassword = async (req, res, next) => {
  const {password} = req.body;
  try {
    const admin = await Admin.findOne({
      resetPasswordToken: req.params.token
      // resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({ error: "Invalid or expired token" });
      
    } 
    else {
      const salt = await bcrypt.genSalt(10);
        const passwordhash = await bcrypt.hash(password, salt);
      admin.password = passwordhash;
      admin.resetPasswordToken = null;
      // user.resetPasswordTokenExpires = null;
      await admin.save();

      res.status(200).json({ message: "Password reset successful" });
    }
  } catch (err) {
    next(err);
  }
};