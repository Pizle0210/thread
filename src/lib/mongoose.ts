import mongoose from "mongoose";

let isConnected = false; //check if mongoose is connected

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("MONGODB_URI not found");

  //   if connected
  if (isConnected) return console.log("Already connected to database");

  try {
    // connect to db
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("now connected");
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "error connecting to database";
    throw new Error(errMsg);
  }
};
