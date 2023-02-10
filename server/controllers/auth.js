import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { CreateCustomeError } from "../Helper/error.js";
import jwt from "jsonwebtoken";

export const test = (req, res, next) => {
  res.send("Hello from test api auth controller.");
};

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    const { password, ...user } = newUser._doc;

    res.status(200).json({ success: true, user: user });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    // console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(CreateCustomeError("User not found!", 404));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) next(CreateCustomeError("Wrong Credentials!", 400));
    // console.log(user);
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key);

    const { password, ...others } = user._doc;
    // console.log(token);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
