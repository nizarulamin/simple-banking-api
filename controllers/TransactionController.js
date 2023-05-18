const Transaction = require("../models/transaction");
const Account = require("../models/account");

const createTransaction = async (req, res) => {
  try {
    // Extract the transaction details from the request body
    const { senderAccountId, receiverAccountId, amount } = req.body;

    // Find the sender account
    const senderAccount = await Account.findById(senderAccountId);

    if (!senderAccount) {
      // If sender account is not found, send a not found response
      return res.status(404).json({ message: "Sender account not found" });
    }

    // Check if the sender has enough balance
    if (senderAccount.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Find the receiver account
    const receiverAccount = await Account.findById(receiverAccountId);

    if (!receiverAccount) {
      // If receiver account is not found, send a not found response
      return res.status(404).json({ message: "Receiver account not found" });
    }

    // Create a new transaction instance
    const transaction = new Transaction({
      senderAccountId,
      receiverAccountId,
      amount,
    });

    // Update account balances
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    // Save the updated accounts and the transaction to the database
    await Promise.all([
      senderAccount.save(),
      receiverAccount.save(),
      transaction.save(),
    ]);

    // Send a success response
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    // Handle any errors and send an error response
    res
      .status(500)
      .json({ message: "Transaction creation failed", error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();

    // Send the transactions in the response
    res.json(transactions);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({
      message: "Failed to retrieve transactions",
      error: error.message,
    });
  }
};

const getTransactionById = async (req, res) => {
  try {
    // Extract the transaction ID from the request parameters
    const transactionId = req.params.id;

    // Retrieve the transaction from the database
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      // If transaction is not found, send a not found response
      res.status(404).json({ message: "Transaction not found" });
    } else {
      // Send the transaction in the response
      res.json(transaction);
    }
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({
      message: "Failed to retrieve transaction",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
};
