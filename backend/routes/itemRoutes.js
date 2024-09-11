// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { name } = req.body;
  console.log('POST /api/items called');
  console.log('Request body:', req.body);

  try {
    const newItem = new Item({ name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error saving item:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;