import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

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

export async function activateAccount(req: Request, res: Response) {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET!) as { id: string };

  const check = await User.findById(user.id);
  if (check?.verified) {
    return res.status(400).json({ message: "Email already activated." });
  }

  await User.findByIdAndUpdate(user.id, { verified: true });
  return res.json({ message: "Account has been activated successfully!" });
}

export async function login(req: Request, res: Response) {
  console.log("login...");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const check = bcrypt.compareSync(password, user.password);

  if (!check) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

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
