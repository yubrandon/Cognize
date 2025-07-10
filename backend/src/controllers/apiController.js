const User = require("../db/queries/users");
const Deck = require("../db/queries/decks");
const Card = require("../db/queries/cards");
const Join = require("../db/queries/joins");

async function getUser(req, res) {

}
// Return a list of all decks
async function getDecks(req, res) {
    //use authentication with apssport and req.user object to access user id
    const decks = await Deck.getDecks();
    res.status(200).json({msg:"success!", decks: decks});
}
async function createDeck(req, res) {
    /*
     * Creates a new deck and fetch its id
     * Associate user id with deck id in OWNERS table (WIP - user authentication)
     * Create cards and fetch their ids
     * Associate cards with decks in DECKLISTS table
*/
    const { deckName, cards } = req.body;
    //const id = req.user.id;
    // createDeck returns id of the new deck
    const deckId = await Deck.createDeck(deckName);
    // createCards returns array of ids for new cards
    const cardIds = await Card.createCards(cards);
    await Join.createDecklist(deckId, cardIds);
    //await Join.createDeckOwner(userId, deckId);
    res.status(200).json({msg:"success!"});
}
async function fetchDeck(req, res) {
    res.status(200).json({msg:"success!"});
}
async function editDeck(req, res) {
    res.status(200).json({msg:"success!"});
}
async function deleteDeck(req, res) {
    res.status(200).json({msg:"success!"});
}

module.exports = {
    getUser,
    getDecks,
    createDeck,
    fetchDeck,
    editDeck,
    deleteDeck
}