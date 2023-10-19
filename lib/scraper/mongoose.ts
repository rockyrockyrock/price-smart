import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined.");
    return;
  }

  if (isConnected) {
    console.log("=> using existing database connection.");
    return;
  }

  // If there is a mongodb URI and we are not connected, we can try connecting to our db
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("MongoDB Connected.");
  } catch (error) {
    console.error("Connecting to DB went wrong.");
    throw error;
  }
};
