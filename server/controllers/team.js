const Team = require('../models/team');

exports.deleteTeam = (req, res, next) => {
  Team.deleteTeam(req.teamId)
    .then(() => {
      res.status(200).send('Team successfully deleted.');
    })
    .catch(err => {
      next(err);
    });
};