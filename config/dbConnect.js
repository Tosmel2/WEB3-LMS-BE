import mongoose from "mongoose";

export const dbConnect = async () => {
  try{
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  }catch(error){
    console.log(error.message);
    process.exit(1);
  }
};