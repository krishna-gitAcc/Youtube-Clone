import jwt from "jsonwebtoken";
import { CreateCustomeError } from "../Helper/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(CreateCustomeError("You are not authenticated.", 401));
  }
  // console.log(token);
  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    if (err) return next(CreateCustomeError("Invalid token", 401));
    req.user = user;
    // console.log(user);
    next();
    return;
  });
};
