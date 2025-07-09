const pool = require("../pool")

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