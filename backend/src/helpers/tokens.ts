import jwt from "jsonwebtoken";

export function generateToken(payload: any, expired: any) {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: expired,
  });
}
