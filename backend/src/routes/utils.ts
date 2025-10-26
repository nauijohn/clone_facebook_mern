import { NextFunction, Request, RequestHandler, Response } from "express";

// Wrapper for both sync and async route handlers
export function handle(fn: RequestHandler): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}
