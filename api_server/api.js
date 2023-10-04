const express = require('express');
const router = express.Router();
const mongoose = require('../config/mongoose'); // Import your Mongoose configuration module
const apiRoutes = require('../routes/apiRoutes'); // Import your API routes
const { createUser } = require('./auth');
const { authenticateUser, authorizeRole } = require('./auth');
const crypto = require('crypto');
const errorHandler = require('./errorHandler'); // Import your error handling module
const app = express();
require('dotenv').config();




const app = express();
app.use('/api', apiRoutes);



function generateSecretKey() {
  // Generate a random secret key
  const key = crypto.randomBytes(32).toString('hex');
  return key;
}

console.log('API Secret Key:', secretKey);
// Create user endpoint
router.post('/users', (req, res) => {
  const { username, password, role } = req.body;
  const user = createUser(username, password, role);

  if (!user) {
    return res.status(400).json({ error: 'Duplicate username' });
  }

  res.status(201).json(user);
});

// Authentication middleware
router.use(authenticateUser);

// Authorization middleware for admin routes
router.use('/admin', authorizeRole(['admin']));

// Authorization middleware for normal user routes
router.use('/normal', authorizeRole(['normal']));

// Implement your inventory API endpoints with proper authorization here


app.use(errorHandler.handleValidationErrors);
app.use(errorHandler.handleServerError);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = router;