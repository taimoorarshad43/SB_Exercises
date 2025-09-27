// Custom error class for Express applications
class ExpressError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.status = statusCode;
    this.name = 'ExpressError';
    
    // Log the error stack for debugging
    console.error(`Error ${statusCode}: ${message}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ExpressError);
    }
  }
}

module.exports = ExpressError;
