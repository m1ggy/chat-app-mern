export function generateAccessToken(user, expiresIn) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn,
  });
}
