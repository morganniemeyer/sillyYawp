class Review {
  id;
  user_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }
}

module.exports = { Review };
