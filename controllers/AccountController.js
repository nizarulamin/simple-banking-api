const Account = require("../models/account");

const createAccount = async (req, res) => {
  try {
    // Extract the account details from the request body
    const { accountNumber, name, balance } = req.body;

    // Create a new instance of the Account model
    const account = new Account({ accountNumber, name, balance });

    // Save the account to the database
    await account.save();

    // Send a success response
    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    // Handle any errors and send an error response
    res
      .status(500)
      .json({ message: "Account creation failed", error: error.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    // Retrieve all accounts from the database
    const accounts = await Account.find();

    // Send the accounts in the response
    res.json(accounts);
  } catch (error) {
    // Handle any errors and send an error response
    res
      .status(500)
      .json({ message: "Failed to retrieve accounts", error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    // Extract the account ID from the request parameters
    const accountId = req.params.id;

    // Retrieve the account from the database
    const account = await Account.findById(accountId);

    if (!account) {
      // If account is not found, send a not found response
      res.status(404).json({ message: "Account not found" });
    } else {
      // Send the account in the response
      res.json(account);
    }
  } catch (error) {
    // Handle any errors and send an error response
    res
      .status(500)
      .json({ message: "Failed to retrieve account", error: error.message });
  }
};
const updateAccount = async (req, res) => {
  try {
    // Extract the account ID from the request parameters
    const accountId = req.params.id;

    // Find the account by ID and update its details
    const account = await Account.findByIdAndUpdate(accountId, req.body, {
      new: true,
    });

    if (!account) {
      // If account is not found, send a not found response
      res.status(404).json({ message: "Account not found" });
    } else {
      // Send the updated account in the response
      res.json({ message: "Account updated successfully", account });
    }
  } catch (error) {
    // Handle any errors and send an error response
    res
      .status(500)
      .json({ message: "Failed to update account", error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // Extract the account ID from the request parameters
    const accountId = req.params.id;

    // Find the account by ID and delete it
    const account = await Account.findByIdAndRemove(accountId);

    if (!account) {
      // If account is not found, send a not found response
      res.status(404).json({ message: "Account not found" });
    } else {
      // Send a success response
      res.json({ message: "Account deleted successfully" });
    }
  } catch (error) {
    // Handle any errors and send an error response
    res
      .status(500)
      .json({ message: "Failed to delete account", error: error.message });
  }
};
module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
};
