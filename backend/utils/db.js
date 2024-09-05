import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(`Mongodb connected unsuccessfully ${error}`);
  }
};

export default connectDB;
