"use strict";

const { Model, DataTypes } = require('sequelize');
// const bcrpyt = require('bcryptjs');
// const sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Course extends Model { }
    Course.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Field Requires a Title'
                },
                notNull: {
                    msg: 'Please enter a Title'
                }
            }
        },
        descripton: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Field Requires a Description'
                },
                notNull: {
                    msg: 'Please enter a Description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.STRING
        }
    },
        { sequelize }
    );
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey: {
                fieldName: 'userId',
                allowNull: 'false',
            }
        })
    };
    return Course;
}