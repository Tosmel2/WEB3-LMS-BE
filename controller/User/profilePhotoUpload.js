export const profilePhotoUpload = async(req, res) => {
  // console.log(req.file);
  try {

  const profileUserToBeUpdated = await User.findById(req.userAuth);
  // const profileUserToBeUpdated = await User.findById(req.user);
  if (!profileUserToBeUpdated) {
      res.json({
           status:"error",
           message:"User not found"
      })
  }

  //if the user is updating
  if(req.file){
      //update the profile
      // await User.findByIdAndUpdate(req.user,{
      await User.findByIdAndUpdate(req.userAuth,{
          $set:{
              profilephoto: req.file.path
          },
      },{
          new:true,
      }
      );
      res.json({
          status: 'success',
          data: 'image uploaded successfully'
      })
  }
      
  } catch (error) {
      res.json(error.message)
  }
}