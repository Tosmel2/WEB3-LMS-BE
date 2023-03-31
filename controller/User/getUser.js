import User from '../../model/User.js'




export const getUser = async (req, res) => {
  try {
    // const existingUser = await User.findById(req.params.id);
    const existingUser = await User.findById(req.user);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: "success",
      data: existingUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};