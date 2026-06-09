const { Todo } = require("../models");

module.exports = (req, res, next) => {
  Todo.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((todo) => {
      if (todo.user_id === req.currentUserId) {
        next();
      } else {
        console.log(req.currentUserId);
        next({
          status: 401,
          message: "authorization is failed",
        });
      }
    })
    .catch(next);
};
