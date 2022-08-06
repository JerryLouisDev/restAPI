"use strict";

const { Model, DataTypes, ConnectionRefusedError } = require('sequelize');
// const bcrpyt = require('bcryptjs');
// const sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Course extends Model { 
        static associate(models) {}
    }

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
                }
            }
        },
        descripton: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Field Requires a Description'
                }
            }
        },
        estimatedTime: DataTypes.STRING,
        materialsNeeded: DataTypes.STRING
    },{ 
        sequelize,
        modelName: 'Course',
     }
    );
    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            foreignKey:  'userId'
        })
    };
    return Course;
}