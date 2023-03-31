import User from '../../model/User.js'
import bcrypt from "bcrypt";
import {generateToken} from '../../middleware/jwt.js';


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ 
        status: "error",
        message: 'Wrong login details' 
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ 
        status: "error",
        message: 'Wrong login details' 
      });
    }

    // const token = jwt.sign(
    //   { email: existingUser.email, id: existingUser._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '2h' }
    // );

    res.status(200).json({ 
      status: "success",
       // data: "Your details has successfully logged in"
      data: {
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      email: existingUser.email,
      // user: existingUser, 
      token: generateToken(existingUser._id) 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};

// export default login;