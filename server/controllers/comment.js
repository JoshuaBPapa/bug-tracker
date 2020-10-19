const Comment = require('../models/comment');

exports.postCreateComment = (req, res, next) => {
  const newComment = new Comment(
    req.body.title,
    req.body.content,
    req.userId,
    req.params.ticketId,
    req.teamId
  )

  newComment.create()
    // send the ticketId of the comment so the client can use it to redirect to the ticket
    .then(() => {
      res.status(201).json({ id: req.params.ticketId });
    })
    .catch(err => {
      next(err);
    });
};