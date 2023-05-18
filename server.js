require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api", accountRoutes);
app.use("/api", transactionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
