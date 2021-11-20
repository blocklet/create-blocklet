module.exports = (req, res, next) => {
  if (req.headers['x-user-did']) {
    req.user = {
      did: req.headers['x-user-did'],
      role: req.headers['x-user-role'],
      fullName: decodeURIComponent(req.headers['x-user-fullname']),
    };
  }
  next();
};
