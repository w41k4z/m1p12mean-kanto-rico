const mongoose = require('mongoose');
const TokenTransaction = require('../models/TokenTransaction');

exports.getUserAvailableTokens = async (userId) => {
    const result = await TokenTransaction.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: "$user", totalTokens: { $sum: "$amount" } } }
    ]);
    return result.length > 0 ? result[0].totalTokens : 0;
}

exports.getTokenTransactions = (filter, page, size) => {
    return TokenTransaction.find(filter).skip(page).limit(size).sort({ transactionDate: -1 });
}

exports.createTokenTransaction = (transactionDate, userId, amount, description) => {
    const transaction = new TokenTransaction({
        transactionDate,
        user: userId,
        amount,
        description
    });
    return transaction.save();
}