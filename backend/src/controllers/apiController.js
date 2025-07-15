const User = require("../db/queries/users");
const Deck = require("../db/queries/decks");
const Card = require("../db/queries/cards");
const Join = require("../db/queries/joins");

async function getUser(req, res) {

}
// Return a list of all decks, will change to user's decks
async function getDecks(req, res) {
    //use authentication with passport and req.user object to access user id
    const decks = await Deck.getAll();
    res.status(200).json({msg:"success!", decks: decks});
}
async function createDeck(req, res) {
    const { deckName, cards } = req.body;
    //const id = req.user.id;
    const deckId = await Deck.create(deckName);
    const cardIds = await Card.create(cards);
    await Join.createDecklist(deckId, cardIds);
    //await Join.createDeckOwner(userId, deckId);
    res.status(200).json({msg:"success!"});
}
async function getDeckCards(req, res) {
    const { deckId } = req.params;
    const deckName = await Deck.getName(deckId);
    const cards = await Card.getCards(deckId);
    res.status(200).json({msg:"success!", name:deckName, cards: cards});
}
async function deleteDeck(req, res) {
    const { deckId } = req.params;
    await Deck.deleteDeck(deckId);
    res.status(200).json({msg:"success!"});
}
async function editDeck(req, res) {
    /*
     * Wipes existing deck and cards and reinserts
        * Can configure to check differences on front end and pass into request
        * Individual card changes (update, delete, add) are included in body
    */
   const { deckId } = req.params;
   const { deck } = req.body;
   await Deck.update(deckId);
    res.status(200).json({msg:"success!"});
}

module.exports = {
    getUser,
    getDecks,
    createDeck,
    getDeckCards,
    editDeck,
    deleteDeck
}