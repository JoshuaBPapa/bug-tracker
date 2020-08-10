const { Router } = require('express');

const ticketControllers = require('../controllers/ticket');

const router = Router();

router.get('/tickets', ticketControllers.getTickets);

router.post('/tickets',ticketControllers.postCreateTicket);

module.exports = router;