"use strict";

module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define("Center", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,}
  })
                               
  return Center;
}
  
  
