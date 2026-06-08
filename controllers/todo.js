const { Todo } = require("../models");

console.log("masuk ke sini ====================");
class TodoController {
  static create(req, res, next) {
    const { title, description, status, due_date } = req.body;
    const newTodo = { title, description, status, due_date };
    newTodo.UserId = req.currentUserId;
    Todo.create(newTodo)
      .then((todo) => {
        res.status(201).json(todo);
      })
      .catch(next);
  }
  static findAll(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.currentUserId,
      },
    })
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch(next);
  }
  static findOne(req, res, next) {
    let id = req.params.id;
    Todo.findOne({
      where: {
        id: id,
      },
    })
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let id = req.params.id;
    const { title, description, status, due_date } = req.body;
    const updateTodo = { title, description, status, due_date };
    Todo.update(updateTodo, {
      where: {
        id: id,
      },
    })
      .then((todo) => {
        return Todo.findOne({
          where: {
            id: id,
          },
        });
      })
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch(next);
  }
  static remove(req, res, next) {
    let id = req.params.id;
    let todoDeleted;
    Todo.findOne({
      where: {
        id: id,
      },
    })
      .then((todo) => {
        todoDeleted = todo;
        return Todo.destroy({
          where: {
            id: id,
          },
        });
      })
      .then((todo) => {
        res.status(200).json(todoDeleted);
      })
      .catch(next);
  }
}

module.exports = TodoController;
