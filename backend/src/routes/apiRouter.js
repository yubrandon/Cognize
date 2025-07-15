// Import Router from Express
const { Router } = require("express");
// Import controller to handle application flow
const apiController = require("../controllers/apiController");
//Define the router
const apiRouter = Router();


// Get list of all decks
apiRouter.get("/decks", apiController.getDecks);
// Create a new deck entry
apiRouter.post("/decks", apiController.createDeck);
// Fetch a specific deck by ID
apiRouter.get("/decks/:deckId", apiController.getDeckCards);
// Delete an existing deck by ID
apiRouter.delete("/decks/:deckId", apiController.deleteDeck);
// Edit an existing deck by ID
apiRouter.put("/decks/:deckId", apiController.editDeck);


module.exports = apiRouter;