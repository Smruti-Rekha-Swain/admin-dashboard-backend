import mongoose from "mongoose";
import { envConfig } from "./env.js";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(envConfig.dbUri);
    console.info("Successfully connected to MongoDB!");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw error;
  }
};

export const disconnectFromMongo = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(`MongoDB disconnection error: ${error}`);
    throw error;
  }
};

mongoose.connection
  .on("error", (error) => {
    console.error(`MongoDB connection error: ${error}`);
  })
  .once("open", () => {
    console.info("MongoDB connection is open.");
  });
