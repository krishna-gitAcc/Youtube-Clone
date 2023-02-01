import jwt from "jsonwebtoken";
import CreateCustomeError from "../Helper/error.js";

const getAccessToRoute = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(CreateCustomeError("You are not authenticated.", 401));
  }

  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) return next(CreateCustomeError("Invalid token", 401));
    req.user = user;
    console.log(user);
    next();
  });
};
