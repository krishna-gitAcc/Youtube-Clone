import express from "express";

import { installServerConfigs } from "./configs/index.js";
import { connectMongoDb } from "./database/index.js";

installServerConfigs();
connectMongoDb();

const port = process.env.port;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log(`server is listning at port ${port}`);
});
