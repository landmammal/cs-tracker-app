"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
 const LogHours = sequelize.define("LogHours", {
      date: DataTypes.DATEONLY,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      contact: DataTypes.STRING,
      description: DataTypes.STRING,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      school: DataTypes.STRING,
      total_hours: DataTypes.INTEGER,
      approved: DataTypes.BOOLEAN
 });
  LogHours.associate = function(models) {
    // associations can be defined here
    LogHours.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "student",
      onDelete: "CASCADE",
    });
  };

  return LogHours;
};
