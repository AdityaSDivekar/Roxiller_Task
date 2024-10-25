// models/ProductTransaction.js
const mongoose = require('mongoose');

// Define the schema
const ProductTransactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
});

// Create and export the model
const ProductTransaction = mongoose.model('ProductTransaction', ProductTransactionSchema);
module.exports = ProductTransaction;
