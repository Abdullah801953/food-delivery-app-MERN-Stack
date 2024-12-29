// in this file we can write logic to connect to database
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abdullahkhan99058:WuyrbTk3gKSzdcOa@cluster0.z4p12.mongodb.net/food-del"
    );
    console.log('db connected');
  } catch (error) {
    console.log("error", error);
  }
};
