// app.js

const combined=require('./Controllers/combined');
const piechart=require('./Controllers/piechart');
const search=require('./Controllers/search');
const stats=require('./Controllers/Stats');
const bar=require('./Controllers/bar');

const express = require('express');
const app = express();


const { seedDatabase } = require('./seed'); // Import seed function
const mongoose = require('./db'); // Import DB connection
const cors=require("cors")
require("dotenv").config()


app.use(cors())
// Route to initialize the database
app.get('/initialize-database', seedDatabase);

app.use('/api',combined);
app.use('/api',piechart);
app.use('/api',search);
app.use('/api',stats);
app.use('/api',bar);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
