// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
  }));
app.use(bodyParser.json());

// Use routes
app.use('/api/items', itemRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));