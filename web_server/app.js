const express = require('express');
const app = express();
const path = require('path');
const webRoutes = require('../routes/webRoutes'); // Import your web routes

const app = express();


app.use('/', webRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Web server is running on port ${port}`);
});