const { Router } = require('express');

const teamControllers = require('../controllers/team');

const router = Router();

// DELETE a team
router.delete(
  '/teams/team',
  teamControllers.deleteTeam
);

module.exports = router;