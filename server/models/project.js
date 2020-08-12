const Sequelize = require('sequelize');
 
const sequelize = require('../database/database');
 
const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING
});
 
module.exports = Project; 