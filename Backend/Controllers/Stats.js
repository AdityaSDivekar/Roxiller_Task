// routes/statistics.js
const express = require('express');
const ProductTransaction = require('../models/ProductTransaction'); // Import the model
const router = express.Router();

// API to fetch statistics for the selected month
router.get('/statistics', async (req, res) => {
    const { month } = req.query;

    // Build the query for filtering by month
    const query = month ? {
        dateOfSale: {
            $regex: new RegExp(`^\\d{4}-${month}-`, 'i') // Match the month regardless of the year
        }
    } : {};

    try {
        // Calculate total sale amount
        const totalSaleAmount = await ProductTransaction.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);

        // Count total sold items
        const totalSoldItems = await ProductTransaction.countDocuments({ ...query, sold: true });
        
        // Count total not sold items
        const totalNotSoldItems = await ProductTransaction.countDocuments({ ...query, sold: false });

        // Respond with the statistics
        res.json({
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching statistics.' }); // Handle errors
    }
});

module.exports = router;
