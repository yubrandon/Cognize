const pool = require("../pool");

// Create an entry into decks
// Returns the new deck id
module.exports.createDeck = async function createDeck(deckName) {
    const createQuery = `INSERT INTO decks (name) VALUES ($1)`;
    await pool.query(createQuery, [deckName]);
    const idQuery = `SELECT MAX (id) FROM decks`;
    const { rows } = await pool.query(idQuery);
    return rows[0].max;
}
// Fetches all decks
// Will have two functions for fetch by user id and shareable id in the future
module.exports.getDecks = async function getDecks() {
    // Can also retrieve number of cards in each deck using deckid
    const fetchQuery = `SELECT * FROM decks`;
    const { rows } = await pool.query(fetchQuery);
    return rows;
    
}


