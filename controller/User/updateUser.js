import User from '../../model/User.js'


export const updateUser = async (req, res) => {

  try {
    const { id } = req.params;
    const { username,fullname, aboutYou, profession,interest } = req.body;

    await User.findOneAndUpdate(
      { _id: id },
      { username,fullname, aboutYou, profession,interest },
      { useFindAndModify: false }
    );

    res.json({ message: "the user has been updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
  // try {
  //   const existingUser = await User.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //   });
  //   if (!existingUser) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   res.status(200).json({
  //     status: 'success',
  //     // data: "user details updated",
  //     data: {existingUser}
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: 'Something went wrong' });
  //   console.error(error);
  // }
};