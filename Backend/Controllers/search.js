// routes/transactions.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction'); // Import the model
const router = express.Router();

// API to list all transactions with search and pagination
router.get('/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    // Build the query for filtering by month
    const query = month ? {
        dateOfSale: {
            $regex: new RegExp(`^\\d{4}-${month}-`, 'i') // Match the month regardless of the year
        }
    } : {};

    // If there is a search term, add it to the query
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search } }
        ];
    }

    try {
        // Fetch transactions with pagination
        const transactions = await ProductTransaction.find(query)
            .limit(perPage) // Limit results to the perPage value
            .skip((page - 1) * perPage); // Skip results for previous pages
        
        // Get the total number of documents matching the query
        const total = await ProductTransaction.countDocuments(query);
        
        // Return the transactions along with pagination info
        res.json({ transactions, total, page });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching transactions.' }); // Handle errors
    }
});

module.exports = router;
