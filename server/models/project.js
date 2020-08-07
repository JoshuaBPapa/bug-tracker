const Sequelize = require('sequelize');
 
const sequelize = require('../database/database');
 
const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING(45)
});
 
module.exports = Project;
