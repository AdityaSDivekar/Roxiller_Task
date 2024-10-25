const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/roxilerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Mongoose schema
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

const ProductTransaction = mongoose.model('ProductTransaction', ProductTransactionSchema);

// API to seed database by fetching data from the third-party API
app.get('/initialize-database', async (req, res) => {
    try {
        // Fetch data from the provided URL
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
console.log(res)
        // Clear the existing data
        await ProductTransaction.deleteMany({});

        // Seed the database with the fetched data
        await ProductTransaction.insertMany(transactions);

        res.json({ message: 'Database initialized with seed data.' });
    } catch (error) {
        res.status(500).json({ error: 'Error initializing database.' });
    }
});

// Start the express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
