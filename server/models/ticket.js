const Sequelize = require('sequelize');

const sequelizse = require('../database/database');

const Ticket = sequelizse.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  priority: Sequelize.STRING,
  title: Sequelize.STRING,
  status: Sequelize.STRING
});

module.exports = Ticket;