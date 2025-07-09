const pool = require("../pool")

module.exports.createCards = async function createCards(cards) {
    const cardIds = [];
    for(let card in cards) {
        const cardQuery = `INSERT INTO CARDS (term, description) VALUES ($1, $2)`;
        await pool.query(cardQuery, [card.term, card.def]);
        const idQuery = `SELECT MAX (id) FROM CARDS`;
        const { rows } = pool.query(idQuery);
        cardIds.push(rows[0].max);
    }
    return cardIds;
}