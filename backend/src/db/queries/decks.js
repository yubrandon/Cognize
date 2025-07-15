const pool = require("../pool");

// Create an entry into decks
// Returns the new deck id
module.exports.create = async function create(deckName) {
    const createQuery = `INSERT INTO decks (name) VALUES ($1)`;
    await pool.query(createQuery, [deckName]);
    const idQuery = `SELECT MAX (id) FROM decks`;
    const { rows } = await pool.query(idQuery);
    return rows[0].max;
}
// Fetches all decks
// Will have two functions for fetch by user id and shareable id in the future
module.exports.getAll = async function getAll() {
    // Can also retrieve number of cards in each deck using deckid
    const fetchQuery = `SELECT * FROM decks`;
    const { rows } = await pool.query(fetchQuery);
    return rows;
    
}

// Delete a deck and its cards
// Delete cards first to cascade into decklists
module.exports.deleteDeck = async function deleteDeck(deckId) {
    const cardQuery = ` DELETE FROM cards
                        WHERE cards.id IN
                        (   SELECT card_id 
                            FROM decklists
                            WHERE deck_id = $1)`;
    await pool.query(cardQuery, [deckId]);
    const deckQuery = ` DELETE FROM decks
                        WHERE id = $1`;
    await pool.query(deckQuery, [deckId]);
}

// Updating deck contents
    // Currently rewriting entire deck using id
    // will update to parse differences and update only necessar changes
module.exports.update = async function update(deckId) {

}

