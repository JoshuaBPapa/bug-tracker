const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const ticketControllers = require('../controllers/ticket');
const validation = require('../middleware/validation');

const router = Router();

// GET an individual ticket
router.get('/tickets/ticket/:id', ticketControllers.getATicket);
// GET all tickets assigned to a project
router.get(
  '/tickets/project/:parentId/:orderBy/:pageNumber',
  paginationControllers.calcPagination('tickets', 'project'),
  ticketControllers.getProjectTickets
);
// GET all tickets assigned to a user
router.get(
  '/tickets/user/:parentId/:orderBy/:pageNumber',
  paginationControllers.calcPagination('tickets', 'user'),
  ticketControllers.getUserTickets
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
  validation.validateTicket,
  ticketControllers.postCreateTicket
);

// PUT a ticket
router.put(
  '/tickets/ticket/:editId',
  validation.validateTicket,
  ticketControllers.putUpdateTicket
);

module.exports = router;