const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`SELECT * from episodes.*,
    COALESCE(
      jason_agg(to_jsonb(quotes))
      FILTER (WHERE quotes.id IS NOT NULL), '[]'
    ) as quotes from episodes
    LEFT JOIN quotes on episodes.id = quotes.id
    WHERE episodes.id = $1
    GROUP BY episodes.id`,
    []);
    return rows.map((row) => new Episode(row));
  }
}

module.exports = { Episode };
