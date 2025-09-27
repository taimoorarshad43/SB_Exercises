const express = require('express');
const app = express();
const items = require('./fakeDB');

// Middleware to parse JSON
app.use(express.json());

// GET /items - render a list of shopping items
app.get('/items', (req, res) => {
  return res.json(items);
});

// POST /items - accept JSON data and add it to the shopping list
app.post('/items', (req, res) => {
  const newItem = {
    name: req.body.name,
    price: req.body.price
  };
  items.push(newItem);
  return res.json({ added: newItem });
});

// GET /items/:name - display a single item's name and price
app.get('/items/:name', (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (!foundItem) {
    return res.status(404).json({ error: 'Item not found' });
  }
  return res.json(foundItem);
});

// PATCH /items/:name - modify a single item's name and/or price
app.patch('/items/:name', (req, res) => {
  const foundItemIndex = items.findIndex(item => item.name === req.params.name);
  if (foundItemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const foundItem = items[foundItemIndex];
  
  // Update name and/or price if provided
  if (req.body.name !== undefined) {
    foundItem.name = req.body.name;
  }
  if (req.body.price !== undefined) {
    foundItem.price = req.body.price;
  }
  
  return res.json({ updated: foundItem });
});

// DELETE /items/:name - delete a specific item from the array
app.delete('/items/:name', (req, res) => {
  const foundItemIndex = items.findIndex(item => item.name === req.params.name);
  if (foundItemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items.splice(foundItemIndex, 1);
  return res.json({ message: 'Deleted' });
});

// 404 handler
app.use((req, res) => {
  return res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({ error: err.message });
});

module.exports = app;
