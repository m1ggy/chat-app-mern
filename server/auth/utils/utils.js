import jwt from 'jsonwebtoken';

export function generateAccessToken(user, expiresIn) {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn,
  });
}
