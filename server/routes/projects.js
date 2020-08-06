const { Router } = require('express');

const router = Router();

router.get('/projects', (req, res,) => {
  res.send('projects GET');
});

module.exports = router;