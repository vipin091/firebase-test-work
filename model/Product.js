const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  investedAmount: String,
  addedOn: String,
  updatedOn: String,
});

module.exports = mongoose.model("Product", productSchema);
