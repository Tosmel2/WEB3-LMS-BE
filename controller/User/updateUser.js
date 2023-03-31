import User from '../../model/User.js'


export const updateUser = async (req, res) => {
  try {
    const existingUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      // data: "user details updated",
      data: {existingUser}
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};