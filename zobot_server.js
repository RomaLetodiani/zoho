// app.js
// Run:   node app.js
// Prereqs: npm install express body-parser

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// We only need JSON parsing so req.body is the parsed object:
app.use(bodyParser.json());

app.post("/zobot/webhook", (req, res) => {
  // Log the incoming payload (for debugging). In production, you might remove this.
  console.log("Incoming Zobot payload:", JSON.stringify(req.body, null, 2));

  const payload = req.body;
  const handler = payload.handler; // should be "trigger" on new chat

  // If it's a "trigger" event (new conversation), send the welcome message
  switch (handler) {
    case "trigger":
      console.log("Trigger event received");
      const responsePayload = {
        action: "reply",
        replies: [
          {
            text: "Hello! Welcome to our support chat. How can I assist you today?",
          },
        ],
      };
      // IMPORTANT: use res.json(...) so Zoho sees a proper JSON payload
      return res.status(200).json(responsePayload);
      break;
    case "message":
      console.log("Message event received");
      const message = payload.message;
      const messageText = message.text;
      console.log("Message text:", messageText);
      const secondResponsePayload = {
        action: "reply",
        replies: [
          {
            text: `How are you? Your message: "${messageText}"`,
          },
        ],
      };
      return res.status(200).json(secondResponsePayload);
      break;

    default:
      console.log("Unknown handler received:", handler);
      return res.sendStatus(200);
      break;
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Zobot webhook listening on port ${PORT}`);
});
