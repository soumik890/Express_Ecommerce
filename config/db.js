import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();
const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_url);
    console.log(`Connected to DB ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`error occured in db ${error}`.bgRed.white);
  }
};

export default connectdb;
