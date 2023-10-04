const mongoose = require('mongoose');

// Define a schema for inventory items
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: { type: String, enum: ['small', 'medium', 'large'] },
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

// Example database operations
const createItem = async (itemData) => {
  const item = new Item(itemData);
  await item.save();
  return item;
};

const getAllItems = async () => {
  return await Item.find();
};

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example usage
createItem({ name: 'Item 1', price: 10.99, size: 'small' }).then((item) => {
  console.log('Created Item:', item);
});

getAllItems().then((items) => {
  console.log('All Items:', items);
});