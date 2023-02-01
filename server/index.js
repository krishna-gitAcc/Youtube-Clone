import express from "express";
import cookieParser from "cookie-parser";

import { installServerConfigs } from "./configs/index.js";
import { connectMongoDb } from "./database/index.js";
import { CustomerrorHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

installServerConfigs();
connectMongoDb();

const port = process.env.port;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);
app.use(CustomerrorHandler);

app.listen(3000, () => {
  console.log(`server is listning at port ${port}`);
});
