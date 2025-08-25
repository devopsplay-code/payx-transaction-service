// src/server.js
import express from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js"; // your model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection (update URI as needed)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/payx";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (!name || !amount) return res.status(400).json({ error: "Name and amount are required" });

    const transaction = await Transaction.create({
      name,
      amount,
      status: "Completed"
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Transaction service running on port ${PORT}`);
});
