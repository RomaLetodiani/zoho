// File: zobot_server.js
// Run:   NODE_ENV=production node zobot_server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // Parse JSON bodies

// Replace with your desired port or use process.env.PORT if deployed to Heroku/etc.
const PORT = process.env.PORT || 3000;

app.post("/zobot/webhook", (req, res) => {
  // Log the incoming payload (for debugging). In production, you might remove this.
  console.log("Incoming Zobot payload:", JSON.stringify(req.body, null, 2));

  // Respond with a simple "Hello World" text action
  const responsePayload = {
    action: {
      type: "text",
      message: "Hello World",
    },
    context: {
      sessionVars: {}, // no custom session vars to pass back
    },
  };

  // Return 200 OK with JSON
  res.status(200).json(responsePayload);
});

app.listen(PORT, () => {
  console.log(`🚀 Zobot webhook listening on port ${PORT}`);
});
