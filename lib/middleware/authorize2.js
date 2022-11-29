const { Review } = require('../models/reviews.js');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getById(req.params.id);

    if (
      review &&
      (req.user.email === 'admin' || review.user_id === req.user.id)
    ) {
      next();
    } else {
      throw new Error('You do not have access to delete this!');
    }
  } catch (err) {
    err.status = 406;
    next(err);
  }
};
