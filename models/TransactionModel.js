// Define the Transaction class representing a transaction entity
class Transaction {
  constructor(id, senderAccountId, receiverAccountId, amount, date) {
    this.id = id;
    this.senderAccountId = senderAccountId;
    this.receiverAccountId = receiverAccountId;
    this.amount = amount;
    this.date = date;
  }
}

module.exports = Transaction;
