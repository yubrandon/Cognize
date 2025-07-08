const pool = require("../pool");

// Create an entry into decks
// Returns the deck id
module.exports.createDeck = async function createDeck(deckName) {
    const SQL = `INSERT INTO decks (name) VALUES ($1)`;
    const response = await pool.query(SQL, [deckName]);
    const idQuery = `SELECT MAX(id) FROM decks`;

    //return rows;
}


