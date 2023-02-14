"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    isValidPassword = async (password) => {
      const user = this;
      const compare = await bcrypt.compare(password, user.password);

      return compare;
    };
    static associate(models) {
      this.hasMany(models.Todo, {
        foreignKey: "userId",
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: 8 },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
