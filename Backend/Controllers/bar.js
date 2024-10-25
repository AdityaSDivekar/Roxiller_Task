// routes/barchart.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction'); // Import the model
const router = express.Router();

// API for bar chart
router.get('/barchart', async (req, res) => {
    const { month } = req.query;

    // Create a query to filter by month
    const query = month ? {
        dateOfSale: {
            $regex: new RegExp(`^\\d{4}-${month}-`, 'i') // Match the month regardless of the year
        }
    } : {};

    // Define the price ranges for the bar chart
    const priceRanges = [
        { $match: { ...query, price: { $gte: 0, $lt: 100 } }, $group: { _id: '0-100', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 101, $lt: 200 } }, $group: { _id: '101-200', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 201, $lt: 300 } }, $group: { _id: '201-300', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 301, $lt: 400 } }, $group: { _id: '301-400', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 401, $lt: 500 } }, $group: { _id: '401-500', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 501, $lt: 600 } }, $group: { _id: '501-600', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 601, $lt: 700 } }, $group: { _id: '601-700', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 701, $lt: 800 } }, $group: { _id: '701-800', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 801, $lt: 900 } }, $group: { _id: '801-900', count: { $sum: 1 } } },
        { $match: { ...query, price: { $gte: 901 } }, $group: { _id: '901-above', count: { $sum: 1 } } },
    ];

    try {
        // Perform the aggregation using the defined price ranges
        const results = await ProductTransaction.aggregate(priceRanges);
        res.json(results);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching bar chart data.' }); // Handle errors
    }
});

module.exports = router;
