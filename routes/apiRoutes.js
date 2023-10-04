const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create a new item
router.post('/items', itemController.createItem);

// Get all items
router.get('/items', itemController.getAllItems);

// Get one item by ID
router.get('/items/:itemId', itemController.getItemById);

// Update an item by ID
router.put('/items/:itemId', itemController.updateItem);

// Delete an item by ID
router.delete('/items/:itemId', itemController.deleteItem);

module.exports = router;