import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Completed", "Pending"], default: "Completed" }
});

export default mongoose.model("Transaction", transactionSchema);
