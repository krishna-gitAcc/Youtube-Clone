import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(req.body);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    const user = await newUser.save();
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ success: true, data: otherDetails });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return next(createError(404, "User not found."));
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(400, "wrong credential"));
    }
    console.log(user._id, "asdfj;laskdjfkl;asjd");
    const token = jwt.sign({ id: user._id }, process.env.jwtSecret);

    const { password, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        data: otherDetails,
      });
  } catch (error) {
    next(error);
  }
};
