const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (!req.cookies)
    return res
      .status(404)
      .send({ message: 'Please Provide Cookie', authenticated: false });

  const { accessCookie } = req.cookies;

  if (!accessCookie)
    return res
      .status(404)
      .send({ message: 'Access Cookie is not defined', authenticated: false });

  const token = jwt.verify(accessCookie, process.env.JWT_SECRET);

  if (!token)
    return res
      .status(404)
      .send({ message: 'Token is Invalid', authenticated: false });

  req.auth = token;

  next();
};
