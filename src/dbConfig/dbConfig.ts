import mongoose from "mongoose";

export async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
