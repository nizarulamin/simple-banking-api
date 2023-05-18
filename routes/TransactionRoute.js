const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/TransactionController");

router.post("/transactions", transactionController.createTransaction);
router.get("/transactions", transactionController.getAllTransactions);
router.get("/transactions/:id", transactionController.getTransactionById);

module.exports = router;
