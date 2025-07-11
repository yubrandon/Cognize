const pool = require("../pool")

// Given an array of cards, create a card entry in CARDS for each card
// Return an array of the ids for each card to add to DECKLISTS
    // Can use a counter and subtract count from final id to avoid excess array
module.exports.createCards = async function createCards(cards) {
    const cardIds = [];
    for(let i in cards) {
        const cardQuery = `INSERT INTO cards (term, definition) VALUES ($1, $2)`;
        let card = cards[i];
        await pool.query(cardQuery, [card.term, card.def]);
        const idQuery = `SELECT MAX (id) FROM cards`;
        const { rows } = await pool.query(idQuery);
        cardIds.push(rows[0].max);
    }
    return cardIds;
}
// Given a deck id, return an array of all cards in that deck
module.exports.getCards = async function getCards(deckId) {
    const deckQuery = ` SELECT * 
                        FROM (cards JOIN decklists ON cards.id = decklists.card_id) 
                        WHERE deck_id = $1`;
    const { rows } = await pool.query(deckQuery, [deckId]);
    return rows;
}
