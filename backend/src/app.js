// Import Express framework
const express = require("express");
// Import CORS middleware for cross-origin requests
const cors = require("cors");
// Load environment variables
require("dotenv").config();

// Create Express instance
const app = express();
// Middleware function to parse incoming JSON requests
app.use(express.json());
// Middleware function to parse URL-encoded data
app.use(express.urlencoded({extended: true}));

// Enable CORS 
app.use(cors({
    origin: "*",
    //credentials:true
}));

// Use Router for API calls
const apiRouter = require("./routes/apiRouter");
// Pass requestst going to /api to the router
app.use("/api", apiRouter);

// Define route for root path
app.use("/", (req, res) => res.status(200).json({msg: "success!", status: "online"}));

app.use("/{*any}", (req, res) => res.status(404).json({msg:"page not found"}));

// Set server port using environment variable or default
const PORT = process.env.PORT || 3000;

// Log active port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})