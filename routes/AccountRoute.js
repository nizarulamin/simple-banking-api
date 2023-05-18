const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

router.post("/accounts", accountController.createAccount);
router.get("/accounts", accountController.getAllAccounts);
router.get("/accounts/:id", accountController.getAccountById); //define the route for reading a specific account by its ID
router.put("/accounts/:id", accountController.updateAccount);
router.delete("/accounts/:id", accountController.deleteAccount); //export the router to make it available for other files to use

module.exports = router;
