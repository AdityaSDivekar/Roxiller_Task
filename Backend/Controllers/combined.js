// routes/transactions.js
const express = require('express');
const router = express.Router();
const ProductTransaction = require('../models/ProductTransaction'); // Make sure to import your model

router.get('/combined-data', async (req, res) => {
    const { month } = req.query;

    try {
        const [stats, barData, pieData] = await Promise.all([
            // Call the statistics API
            ProductTransaction.aggregate([
                { $match: { dateOfSale: { $regex: new RegExp(`^\\d{4}-${month}-`, 'i') } } },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$price" },
                        sold: { $sum: { $cond: ["$sold", 1, 0] } },
                        notSold: { $sum: { $cond: ["$sold", 0, 1] } }
                    }
                }
            ]),
            // Call the bar chart data API
            ProductTransaction.aggregate([
                { $match: { dateOfSale: { $regex: new RegExp(`^\\d{4}-${month}-`, 'i') } } },
                {
                    $group: {
                        _id: {
                            $cond: [
                                { $lt: ["$price", 100] }, "0-100",
                                { $cond: [
                                    { $lt: ["$price", 200] }, "101-200",
                                    { $cond: [
                                        { $lt: ["$price", 300] }, "201-300",
                                        { $cond: [
                                            { $lt: ["$price", 400] }, "301-400",
                                            { $cond: [
                                                { $lt: ["$price", 500] }, "401-500",
                                                { $cond: [
                                                    { $lt: ["$price", 600] }, "501-600",
                                                    { $cond: [
                                                        { $lt: ["$price", 700] }, "601-700",
                                                        { $cond: [
                                                            { $lt: ["$price", 800] }, "701-800",
                                                            { $cond: [
                                                                { $lt: ["$price", 900] }, "801-900",
                                                                "901-above"
                                                            ]}
                                                        ]}
                                                    ]}
                                                ]}
                                            ]}
                                        ]}
                                    ]}
                                ]}
                            ]
                        },
                        count: { $sum: 1 }
                    }
                }
            ]),
            // Call the pie chart data API
            ProductTransaction.aggregate([
                { $match: { dateOfSale: { $regex: new RegExp(`^\\d{4}-${month}-`, 'i') } } },
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ])
        ]);

        res.json({
            totalSaleAmount: stats[0]?.total || 0,
            totalSoldItems: stats[0]?.sold || 0,
            totalNotSoldItems: stats[0]?.notSold || 0,
            barChartData: barData,
            pieChartData: pieData
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching combined data.' });
    }
});

module.exports = router;
