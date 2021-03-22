import jwt from "jsonwebtoken";
import config from "../../config/index.js";

export function createJwt(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: config.auth.jwt.expiresIn,
    }
  );
}
