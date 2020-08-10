const Sequelize = require('sequelize');

const sequelizse = require('../database/database');

const Ticket = sequelizse.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  priority: Sequelize.STRING(6),
  name: Sequelize.STRING(45),
  status: Sequelize.STRING(15)
});

module.exports = Ticket;