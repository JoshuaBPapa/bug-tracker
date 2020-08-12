const { Router } = require('express');

const ticketControllers = require('../controllers/ticket');

const router = Router();

router.get('/tickets', ticketControllers.getTickets);
router.get('/tickets/ticket/:id', ticketControllers.getATicket);

router.post('/tickets',ticketControllers.postCreateTicket);

module.exports = router;