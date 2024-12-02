const errorHandler = (err, req, res, next) => {
    console.error(err); 
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Send a structured error response
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorHandler;
  