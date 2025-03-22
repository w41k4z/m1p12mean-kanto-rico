const mongoose = require("mongoose");

const TokenTransactionSchema = new mongoose.Schema(
  {
    transactionDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TokenTransaction", TokenTransactionSchema);