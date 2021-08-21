export default (req, res, next) => {
  // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
  const allowedMethods = ['OPTIONS', 'HEAD', 'GET', 'POST', 'DELETE'];

  if (req)
    if (req.method !== null)
      if (!allowedMethods.includes(req.method)) {
        res.status(405).send(`${req.method} not allowed.`);
      }

  next();
};
