"use strict";

const { Model, DataTypes } = require('sequelize');
const bcrpyt = require('bcryptjs');
// const sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model { }

    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Field Requires a First Name'
                },
                notNull: {
                    msg: 'Please enter a First Name'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Field Requires a Last Name'
                },
                notNull: {
                    msg: 'Please enter a Last Name'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Field requires a unique password'
            },
            validate: {
                notEmpty: {
                    msg: 'Field Requires a Email'
                },
                notNull: {
                    msg: 'Please enter a Email'
                },
                isEmail: {
                    msg: 'Email address entered is not valid.'
                }
            }
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
                    msg: 'Field Requires a Password'
                },
                notNull: {
                    msg: 'Please enter a Password'
                }
            }
        }
    }, { sequelize });
    User.associate = (models) => {
        User.hasMany(models.Course, {
            foreignKey: "userId",
            allowNull: false
        });
    };
    return User;
}