// Error handling middleware for handling validation errors
function handleValidationErrors(err, req, res, next) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ errors });
    }
    next(err);
  }
  
  // Error handling middleware for generic server errors
  function handleServerError(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  module.exports = {
    handleValidationErrors,
    handleServerError,
  };