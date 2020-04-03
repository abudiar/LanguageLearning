'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    idLang: DataTypes.STRING,
    isRegistered: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
    Class.belongsTo(models.User)
  };
  return Class;
};