const Project = require('../models/project');
const Ticket = require('../models/ticket');

const defineAssociations = () => {
  Ticket.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' });
  Project.hasMany(Ticket);
}

module.exports = defineAssociations;