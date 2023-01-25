import mongoose from "mongoose";

const connectMongoDb = async () => {
  const mongoUrl = process.env.mongo_url;
  mongoose.set("strictQuery", false);
  mongoose.connect(mongoUrl, () => {
    console.log("connected to Mongo successfully");
  });
};

export { connectMongoDb };
