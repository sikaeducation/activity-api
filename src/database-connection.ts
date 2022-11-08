import mongoose from "mongoose";

export async function connect() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL must be defined");

  await mongoose.connect(url, {
    dbName: "activityService",
  });
}
