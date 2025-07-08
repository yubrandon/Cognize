const User = require("../db/queries/users");
const Deck = require("../db/queries/decks");

async function getUser(req, res) {

}
// Return a list of all decks
async function getDecks(req, res) {
    //use authentication with apssport and req.user object to access user id
    res.status(200).json({msg:"success!"});
}
async function createDeck(req, res) {
    const { deckName, cards } = req.body;
    //const id = req.user.id;
    const deckId = await Deck.createDeck(deckName);
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