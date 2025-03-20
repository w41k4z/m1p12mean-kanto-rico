const router = require("express").Router();
const ApiResponse = require("../config/response/api.response");
const TokenTransaction = require("../models/TokenTransaction");
const Pageable = require("../config/response/pageable");
const tokenTrasanctionService = require("../services/token.transaction.service");

router.get("/", async (req, res, next) => {
  try {
    const tokens = await tokenTrasanctionService.getUserAvailableTokens(
      req.user.id
    );
    const payload = { tokens };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTokenTransaction =
      await tokenTrasanctionService.createTokenTransaction(
        new Date(),
        req.user.id,
        req.body.amount,
        req.body.description
      );
    const payload = { tokenTransaction: newTokenTransaction };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

router.get("/transactions", async (req, res, next) => {
  try {
      const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const filter = { user: req.user.id };
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    if (fromDate && toDate) {
        filter.transactionDate = { $gte: fromDate, $lte: toDate };
    }
    console.log(filter);
    const transactions = await tokenTrasanctionService.getTokenTransactions(
      filter, page, size
    );
    const totalElements = await TokenTransaction.countDocuments(filter);
    const payload = { transactions: new Pageable(transactions, page, size, totalElements) };
    res.json(new ApiResponse(payload));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
