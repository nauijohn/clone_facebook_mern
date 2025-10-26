import { NextFunction, Request, Response } from "express";

export default (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("err: ", err);
  res.status(500).json(err);
};
