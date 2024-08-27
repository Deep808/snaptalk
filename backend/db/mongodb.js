import mongoose from "mongoose";

export const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error connecting Mongodb", error.message);
  }
};
