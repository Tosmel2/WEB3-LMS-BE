const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

import bcrypt from "bcrypt";
import generateToken from "../util/generateToken.js";

const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      companyId,
      companyName,
      businessType,
      address,
      noOfEmployee,
      registrationNo,
      role,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phoneNumber,
      companyId,
      companyName,
      businessType,
      address,
      noOfEmployee,
      registrationNo,
      role,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};

// module.exports
export default User;
