const TransactionLog = require("../models/transactionLog");

const logTransaction = async (transaction) => {
  try {
    // Create a new instance of the TransactionLog model
    const transactionLog = new TransactionLog({
      senderAccountId: transaction.senderAccountId,
      receiverAccountId: transaction.receiverAccountId,
      amount: transaction.amount,
      timestamp: Date.now(),
    });

    // Save the transaction log to the database
    await transactionLog.save();
  } catch (error) {
    // Handle any errors
    console.error("Failed to log transaction:", error);
  }
};

module.exports = logTransaction;
