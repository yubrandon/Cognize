const pool = require("../pool");

module.exports.createDecklist = async function createDecklist(deckId, cardIds) {
    for(let id in cardIds) {
        const relationQuery = `INSERT INTO DECKLISTS (deck_id, card_id) VALUES ($1, $2)`;
        await pool.query(relationQuery, [deckId, cardIds[id]]);
    }
}