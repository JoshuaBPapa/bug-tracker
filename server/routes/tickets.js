const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const ticketControllers = require('../controllers/ticket');
const commentControllers = require('../controllers/comment');
const validationMiddleware = require('../middleware/validation');
const authorisationMiddleWare = require('../middleware/authorisation');

const router = Router();

// GET an individual ticket
router.get(
  '/tickets/ticket/:ticketId',
  authorisationMiddleWare.checkTicketAuthorisation(1),
  ticketControllers.getATicket
);
// GET ticket comments
router.get(
  '/tickets/ticket/:ticketId/comments',
  authorisationMiddleWare.checkTicketAuthorisation(1),
  ticketControllers.findTicketComments
);
// GET all users assigned to a ticket
router.get(
  '/tickets/ticket/:ticketId/assigned_users',
  authorisationMiddleWare.checkTicketAuthorisation(1),
  ticketControllers.getUsersAssignedToTicket
);
// GET all tickets assigned to a project
router.get(
  '/tickets/project/:parentId/:orderBy/:pageNumber',
  authorisationMiddleWare.checkTicketAuthorisation(2),
  paginationControllers.calcPagination('tickets', 'project'),
  ticketControllers.getProjectTickets
);
// GET all tickets assigned to a user
router.get(
  '/tickets/user/assigned/:userId/:orderBy/:pageNumber',
  authorisationMiddleWare.checkTicketAuthorisation(1),
  paginationControllers.calcPaginationUserTickets,
  ticketControllers.findTicketsAssignedToUser
);
// GET all tickets created by a user
router.get(
  '/tickets/user/created/:userId/:orderBy/:pageNumber',
  authorisationMiddleWare.checkTicketAuthorisation(2),
  paginationControllers.calcPagination('tickets', 'user'),
  ticketControllers.findTicketsCreatedByUser
);
// GET all tickets
router.get(
  '/tickets/:orderBy/:pageNumber',
  authorisationMiddleWare.checkTicketAuthorisation(2),
  paginationControllers.calcPagination('tickets'),
  ticketControllers.getTickets
);

// POST a new ticket
router.post(
  '/tickets/:assignedProjectId',
  validationMiddleware.validateTicket,
  ticketControllers.postCreateTicket
);
// POST a comment to a ticket
router.post(
  '/tickets/ticket/:ticketId/comments',
  validationMiddleware.validateComment,
  commentControllers.postCreateComment
);

// PUT assign users to a ticket
router.put(
  '/tickets/ticket/:ticketId/assign_users',
  authorisationMiddleWare.checkTicketAuthorisation(2),
  ticketControllers.putAssignUsersToTicket
);

// PUT a ticket
router.put(
  '/tickets/ticket/:editId',
  validationMiddleware.validateTicket,
  ticketControllers.putUpdateTicket
);

// DELETE a ticket
router.delete(
  '/tickets/ticket/:ticketId',
  ticketControllers.deleteTicket
);

module.exports = router;