import User from '../../model/User.js'



export const deleteUser = async (req, res) => {
  try {
    const existingUser = await User.findByIdAndRemove(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      status: 'user deleted',
      dataDeleted: {existingUser}
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
    console.error(error);
  }
};