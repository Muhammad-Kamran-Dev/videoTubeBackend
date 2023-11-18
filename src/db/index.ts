import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

// Connect to MongoDB
const connectDB = async () => {
  const mongoDbUri =
    process.env.NODE_ENVIRONMENT === "production"
      ? `${process.env.MONGODB_URI}`
      : `mongodb://127.0.0.1:27017/${DB_NAME}`;
  console.log("uri is ", mongoDbUri);
  try {
    const connectionInstance = await mongoose.connect(mongoDbUri);

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export { connectDB };
