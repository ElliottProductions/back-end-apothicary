const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`SELECT * from characters.*,
    COALESCE(
      jason_agg(to_jsonb(quotes))
      FILTER (WHERE quotes.id IS NOT NULL), '[]'
    ) as quotes from characters
    LEFT JOIN characters_quotes on characters.id = characters_quotes.character_id
    LEFT JOIN quotes on characters_quotes.quote_id = quotes.id
    WHERE characters.id = $1
    GROUP BY characters.id`,
    []);
    return rows.map((row) => new Character(row));
  }
}

module.exports = Character;
