import { NextFunction, Request, Response } from "express";

export default (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json("test");
};
