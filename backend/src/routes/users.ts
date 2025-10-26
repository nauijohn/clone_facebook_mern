import { Router } from "express";
import { body } from "express-validator";

import { activateAccount, login, register } from "../controllers/users";
import { handle } from "./utils";

const router = Router();

router.post(
  "/register",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("bYear").isInt({ min: 1900 }).withMessage("Invalid birth year"),
    body("bMonth")
      .isInt({ min: 1, max: 12 })
      .withMessage("Invalid birth month"),
    body("bDay").isInt({ min: 1, max: 31 }).withMessage("Invalid birth day"),
    body("gender").notEmpty().withMessage("Gender is required"),
  ],
  handle(register)
);

router.post("/activate", handle(activateAccount));

router.post("/login", handle(login));

export default router;
