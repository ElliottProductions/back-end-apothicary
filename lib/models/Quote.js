const pool = require('../utils/pool');

class Quote {
  id;
  detail;
  character_id;
  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.character_id = row.character_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM quotes');
    return Number(rows[0].count);
  }

  static async insert({ quote }) {
    const { rows } = await pool.query(
      'INSERT INTO quotes (quotes) VALUES ($1) RETURNING *',
      [quote]
    );
    return new Quote(rows[0]);
  }
}

module.exports = { Quote };
