module.exports = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    const message = err.errors.map((el) => el.message);
    res.status(400).json({
      errors: message,
    });
  } else {
    res.status(err.status || 500).json(err.message || "Internal Server Error");
  }
};
