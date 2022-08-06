"use strict";

const { Model } = require("sequelize");
const bcrpyt = require("bcryptjs");
// const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Field Requires a First Name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Field Requires a Last Name",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Field requires a unique password",
        },
        validate: {
          notEmpty: {
            msg: "Field Requires a Email",
          },
          isEmail: {
            msg: "Email address entered is not valid.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          if (val === this.password) {
            const hashedPassword = bcrpyt.hashSync(val, 10);
            this.setDataValue("password", hashedPassword);
          }
        },
        validation: {
          notEmpty: {
            msg: "Field Requires a Password",
          },
        },
      },
    },
    { sequelize, modelName: "User" }
  );
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: "userId",
      allowNull: false,
    });
  };
  return User;
};
