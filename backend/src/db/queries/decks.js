const pool = require("../pool");

// Create an entry into decks
// Returns the new deck id
module.exports.createDeck = async function createDeck(deckName) {
    const deckQuery = `INSERT INTO decks (name) VALUES ($1)`;
    await pool.query(deckQuery, [deckName]);
    const idQuery = `SELECT MAX (id) FROM decks`;
    const { rows } = await pool.query(idQuery);
    return rows[0].max;
}


