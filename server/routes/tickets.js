const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const ticketControllers = require('../controllers/ticket');

const router = Router();

// get an individual ticket
router.get('/tickets/ticket/:id/:orderBy', ticketControllers.getATicket);
// get all tickets assigned to a project
router.get(
  '/tickets/project/:id/:orderBy/:pageNumber',
  paginationControllers.calcPagination('tickets'),
  ticketControllers.getProjectTickets
);
// get all tickets
router.get(
  '/tickets/:orderBy/:pageNumber', 
  paginationControllers.calcPagination('tickets'), 
  ticketControllers.getTickets
);

// post a new ticket
router.post('/tickets', ticketControllers.postCreateTicket);

module.exports = router;