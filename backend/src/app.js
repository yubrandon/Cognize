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
app.use(cors());

// Define route for root path
app.use("/", (req, res) => res.status(200).json({msg: "success!", status: "online"}));

// Set server port using environment variable or default
const PORT = process.env.PORT || 3000;

// Log active port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})