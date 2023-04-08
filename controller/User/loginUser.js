import User from '../../model/User.js'
import bcrypt from 'bcrypt'
// import {generateToken} from '../../middleware/jwt.js';
import loginValidation from '../../validation/login.js'
import generateToken from '../../utilis/generateToken.js'

export const loginUser = async (req, res) => {
  const { error } = loginValidation.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const { email, password } = req.body
  const role = "student"
  // console.log(req.headers);

  // Check if user exists and is a student
  const user = await User.findOne({ email, role: 'student' })
  try {
    if (!user) {
      return res.status(401).json({ message: 'Wrong details' })
    }
    // if (role !== 'student') return res.status(400).send('Access denied');
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    } else {
      res.json({
        status: 'success',
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          token: generateToken(user.id),
        },
      })
    }
    // // Create JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // // Send token to client
    // res.json({ token });
  } catch (error) {
    console.log(error.message)
  }
  // try {
  //   const { email, password } = req.body;

  //   const existingUser = await User.findOne({ email });
  //   if (!existingUser) {
  //     return res.status(404).json({
  //       status: "error",
  //       message: 'Wrong login details'
  //     });
  //   }

  //   const isPasswordCorrect = await bcrypt.compare(
  //     password,
  //     existingUser.password
  //   );
  //   if (!isPasswordCorrect) {
  //     return res.status(400).json({
  //       status: "error",
  //       message: 'Wrong login details'
  //     });
  //   }

  //   // const token = jwt.sign(
  //   //   { email: existingUser.email, id: existingUser._id },
  //   //   process.env.JWT_SECRET,
  //   //   { expiresIn: '2h' }
  //   // );

  //   res.status(200).json({
  //     status: "success",
  //      // data: "Your details has successfully logged in"
  //     data: {
  //     firstname: existingUser.firstname,
  //     lastname: existingUser.lastname,
  //     email: existingUser.email,
  //     // user: existingUser,
  //     token: generateToken(existingUser._id)
  //     }
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: 'Something went wrong' });
  //   console.error(error);
  // }
}

// export default login;
