const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const ticketControllers = require('../controllers/ticket');
const validationChecks = require('../middleware/validation');

const router = Router();

// GET an individual ticket
router.get('/tickets/ticket/:id', ticketControllers.getATicket);
// GET all tickets assigned to a project
router.get(
  '/tickets/project/:id/:orderBy/:pageNumber',
  paginationControllers.calcPagination('tickets'),
  ticketControllers.getProjectTickets
);
// GET all tickets
router.get(
  '/tickets/:orderBy/:pageNumber',
  paginationControllers.calcPagination('tickets'),
  ticketControllers.getTickets
);

// POST a new ticket
router.post(
  '/tickets/:assignedProjectId',
  validationChecks.validateTicket,
  ticketControllers.postCreateTicket
);

// PUT a ticket
router.put(
  '/tickets/:editId',
  validationChecks.validateTicket,
  ticketControllers.putUpdateTicket
);

module.exports = router;