// seed.js
const axios = require('axios');
const mongoose = require('mongoose');
const ProductTransaction = require('./models/ProductTransaction'); // Import the model

// Function to seed the database
const seedDatabase = async (req, res) => {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Clear the existing data
        await ProductTransaction.deleteMany({});

        // Insert fetched data
        await ProductTransaction.insertMany(transactions);

        res.json({ message: 'Database initialized with seed data.' });
    } catch (error) {
        console.error('Error initializing database:', error); // Log the error for debugging
        res.status(500).json({ error: 'Error initializing database.', details: error.message });
    }
};

module.exports = { seedDatabase };
