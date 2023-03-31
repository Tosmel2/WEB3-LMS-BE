import User from '../../model/User.js'

export const getAllUsers = async (req, res) => {
  try {
    const existingUsers = await User.find();
    res.status(200).json({
      status: 'success',
      data: existingUsers
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};