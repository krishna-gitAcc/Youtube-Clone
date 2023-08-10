import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "unauthorized access"));
  jwt.verify(token, process.env.jwtSecret, async (err, user) => {
    if (err) return next(createError(403, "Invalid access token"));
    const currUser = await User.findOne({ _id: user.id });
    if (!currUser) next(createError(404, "user not found"));
    req.user = user;
    next();
  });
};
