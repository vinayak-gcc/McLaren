// server/stripe.js
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.use(cors());
app.use(express.json());

app.post("/stripe", async (req, res) => {
  const { amount } = req.body;

  try {
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount provided" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Stripe server running on http://localhost:${port}`);
});
