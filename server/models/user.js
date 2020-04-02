'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const { bcrypt } = require('../helper/bcrypt')

  class User extends Model { }

  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'fullname cannot be empty'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'email cannot be empty'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password cannot be empty"
          }
        }
      }
    }, {
    hooks: {
      beforeCreate: (instance, options) => {
        return bcrypt(instance.password)
          .then(hashed => {
            instance.password = hashed
          })
      }
    },
    sequelize
  })
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};