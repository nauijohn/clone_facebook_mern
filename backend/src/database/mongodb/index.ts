import mongoose from "mongoose";

export async function initDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide DATABASE_URL", {});
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      authSource: "admin",
    });

    console.info("Connected to DB...");
  } catch (err) {
    console.error("Unable to connect to DB...");
  }
}
