const pool = require("../pool");

// Create an entry into decks
// Returns the new deck id
module.exports.create = async function create(deckName) {
    const createDeck = `INSERT INTO decks (name) VALUES ($1)`;
    await pool.query(createDeck, [deckName]);
    const getId = `SELECT MAX (id) FROM decks`;
    const { rows } = await pool.query(getId);
    return rows[0].max;
}
// Fetches all decks
// Will have two functions for fetch by user id and shareable id in the future
module.exports.getAll = async function getAll() {
    // Can also retrieve number of cards in each deck using deckid
    const getDecks = `SELECT * FROM decks ORDER BY id ASC`;
    const { rows } = await pool.query(getDecks);
    return rows;
    
}
module.exports.getName = async function getName(deckId) {
    const getName = `SELECT name FROM decks WHERE id = $1`;
    const { rows } = await pool.query(getName, [deckId]);
    return rows[0].name;
}

module.exports.deleteDeck = async function deleteDeck(deckId) {
    const deleteDeck = ` DELETE FROM decks
                        WHERE id = $1`;
    await pool.query(deleteDeck, [deckId]);
}

// Updating deck contents
    // Currently rewriting entire deck using id
    // will update to parse differences and update only necessar changes
module.exports.update = async function update(deckId, deckName) {
    const updateName = `    UPDATE decks
                            SET name = $1
                            WHERE id = $2`;
    await pool.query(updateName, [deckName, deckId]);
}

