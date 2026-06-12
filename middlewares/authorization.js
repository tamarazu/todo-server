const { Todo } = require("../models");

module.exports = (req, res, next) => {
  Todo.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((todo) => {
      if (!todo) {
        next({
          status: 400,
          message: "todo is not found",
        });
      } else if (todo.user_id === req.currentUserId) {
        next();
      } else {
        next({
          status: 401,
          message: "authorization is failed",
        });
      }
    })
    .catch(next);
};
