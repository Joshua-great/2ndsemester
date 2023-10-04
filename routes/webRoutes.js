const express = require('express');
const router = express.Router();

// Define web routes
router.get('/', (req, res) => {
  // Define the response for the root URL (e.g., your homepage)
  res.send('Welcome to the homepage');
});

// router.get('/about', (req, res) => {
//   // Define the response for the "/about" URL (e.g., an about page)
//   res.send('About us');
// });

// Define more web routes as needed

module.exports = router;
