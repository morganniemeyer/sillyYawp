const pool = require('../utils/pool.js');

class Review {
  id;
  user_id;
  restaurant_id;
  stars;
  detail;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from reviews WHERE id = $1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from reviews
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Review(rows[0]);
  }

  static async insert({ stars, detail, userId, restaurantId }) {
    const { rows } = await pool.query(
      'INSERT INTO reviews (stars, detail, user_id, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [stars, detail, userId, restaurantId]
    );
    return new Review(rows[0]);
  }
}

module.exports = { Review };
