// routes/transactions.js
const express = require('express');
const router = express.Router();
const ProductTransaction = require('../models/ProductTransaction'); // Import your model

router.get('/piechart', async (req, res) => {
    const { month } = req.query;

    // Construct the query based on the provided month
    const query = month ? {
        dateOfSale: {
            $regex: new RegExp(`^\\d{4}-${month}-`, 'i') // Regex to match month regardless of year
        }
    } : {};

    try {
        // Aggregate the categories and their counts
        const categories = await ProductTransaction.aggregate([
            { $match: query },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.json(categories); // Return the aggregated categories
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching pie chart data.' }); // Handle errors
    }
});

module.exports = router;
