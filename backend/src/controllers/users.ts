import bcrypt from "bcrypt";
import { type Request, type Response } from "express";

import { sendVerificationEmail } from "../helpers/mailer";
import { generateToken } from "../helpers/tokens";
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
  console.log("check: ", check);
  if (check) {
    return res.status(422).json({
      message: "Email already exists.",
    });
  }

  const cryptedPassword = await bcrypt.hash(password, 12);

  const user = await new User({
    first_name,
    last_name,
    email,
    username,
    password: cryptedPassword,
    bYear,
    bMonth,
    bDay,
    gender,
  }).save();

  const emailVerificationToken = generateToken({ id: user._id }, "30min");

  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

  await sendVerificationEmail(user.email, user.first_name, url);

  const token = generateToken({ id: user._id }, "7d");
  return res.send({
    id: user._id,
    username: user.username,
    picture: user.picture,
    first_name: user.first_name,
    last_name: user.last_name,
    token,
    verified: user.verified,
    message: "Register success! Please activate your email to start.",
  });
}
