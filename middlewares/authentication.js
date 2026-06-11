const { checkToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      let errors;
      errors.status = next({
        status: 401,
        success: false,
        message: "Invalid authentication",
      });
    }
    const decoded = checkToken(req.headers.access_token);
    User.findOne({
      where: {
        email: decoded.email,
      },
    })
      .then((user) => {
        if (!user) {
          return next({
            status: 401,
            success: false,
            message: "Invalid authentication",
          });
        }
        req.currentUserId = decoded.id;
        next();
      })
      .catch(next);
  } catch {
    next(err);
  }
};
