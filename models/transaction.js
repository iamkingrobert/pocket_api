const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  timestamps: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionType: { type: String, enum: ['topup', 'transfer'], required: true }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
