import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
var cors = require("cors");

import Routes from "./Routes/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.mongoUrl)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

connect();

app.get("/", (req, res) => {
  res.send("Hello from youtube-backend");
});

app.use("/api", Routes);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong.";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(3000, () => {
  console.log("application is live at port 3000");
});
