"use strict";
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name shouldn't be empty",
          },
          notEmpty: {
            msg: "Name shouldn't be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email shouldn't be empty!",
          },
          notEmpty: {
            msg: "Email shouldn't be empty!",
          },
          isEmail: {
            msg: "Must fill with email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password shouldn't be empty!",
          },
          notEmpty: {
            msg: "password shouldn't be empty!",
          },
          len: {
            args: [6, 12],
            msg: "Password length should between 6 and 12 character",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user, option) => {
          let hash = hashPassword(user.password);
          user.password = hash;
        },
      },
    }
  );
  return User;
};
