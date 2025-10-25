import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

import User from "../models/User";

export async function register(req: Request, res: Response) {
  const {
    first_name,
    last_name,
    email,
    username,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = req.body;

  const check = await User.findOne({ email });
  if (check) {
    return res.status(422).json({
      message: "Email already exists.",
    });
  }

  const cryptedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    first_name,
    last_name,
    email,
    username,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  });

  user.save();

  return res.json(user);
}
