import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    // Use a valid database name (avoid dashes)
    const fullURI = `${process.env.DATABASE_URL}/mernAuth`;
    // console.log("Connection string:", fullURI);

    await mongoose.connect(fullURI);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
