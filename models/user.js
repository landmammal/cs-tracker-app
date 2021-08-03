"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    school: DataTypes.STRING,
    student_id: DataTypes.STRING,
    total_hours: DataTypes.INTEGER,
    done_hours: DataTypes.INTEGER,
    admin: DataTypes.BOOLEAN,
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.LogHours, {
      as: "loghours",
      onDelete: "CASCADE"
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
