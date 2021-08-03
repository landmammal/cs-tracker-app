"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
 const LogHours = sequelize.define("LogHours", {
      ID: DataTypes.INTEGER,
      date: DataTypes.INTEGER,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      contact: DataTypes.STRING,
      description: DataTypes.STRING,
      start_time: DataTypes.INTEGER,
      end_time: DataTypes.INTEGER,
      total_hours: DataTypes.INTEGER,
      approved: DataTypes.BOOLEAN,
      student_id: DataTypes.INTEGER,
  });
  LogHours.associate = function(models) {
    // associations can be defined here
  };

  return LogHours;
};
