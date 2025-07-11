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
apiRouter.get("/decks/:id", apiController.getDeckCards);
// Edit an existing deck by ID
apiRouter.put("/decks/:id", apiController.editDeck);
// Delete an existing deck by ID
apiRouter.delete("/decks/:id", apiController.deleteDeck);


module.exports = apiRouter;