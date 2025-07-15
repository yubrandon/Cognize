const pool = require("../pool")

// Create cards and return an array of the ids for each new card
    // Can use a counter and subtract count from final id to avoid excess array
module.exports.create = async function create(cards) {
    const cardIds = [];
    for(let i in cards) {
        const cardQuery = `INSERT INTO cards (term, definition) VALUES ($1, $2)`;
        let card = cards[i];
        await pool.query(cardQuery, [card.term, card.def]);
        const getId = `SELECT MAX (id) FROM cards`;
        const { rows } = await pool.query(getId);
        cardIds.push(rows[0].max);
    }
    return cardIds;
}
module.exports.delete = async function deleteCards(deckId) {
    const deleteQuery = `   DELETE FROM cards
    WHERE id IN
    (
        SELECT id
        FROM cards
        JOIN decklists ON cards.id = card_id
        WHERE deck_id = $1
    )`;
    await pool.query(deleteQuery, [deckId]);
}
module.exports.getCards = async function getCards(deckId) {
    const getCards = ` SELECT * 
                        FROM (cards JOIN decklists ON cards.id = decklists.card_id) 
                        WHERE deck_id = $1`;
    const { rows } = await pool.query(getCards, [deckId]);
    return rows;
}
