"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title shouldn't be empty!",
          },
          notEmpty: {
            msg: "Title shouldn't be empty!",
          },
        },
      },
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The date shouldn't be empty",
          },
          notEmpty: {
            msg: "The date shouldn't be empty",
          },
          checkDate(value) {
            if (value < new Date()) {
              throw new Error("This date is invalid");
            }
          },
        },
      },
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
    }
  );
  return Todo;
};
