const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const authorize2 = require('../middleware/authorize2.js');
const { Review } = require('../models/reviews.js');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) {
        res.status(404);
        res.send();
      }
      res.json(review);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, authorize2], async (req, res, next) => {
    try {
      await Review.delete(req.params.id);
      res.json({ message: 'Review is gone!' });
    } catch (e) {
      next(e);
    }
  });
