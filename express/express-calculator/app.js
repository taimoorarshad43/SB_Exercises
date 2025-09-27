const express = require('express');
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMean, findMedian, findMode } = require('./helpers');

const app = express();

// Route for calculating mean
app.get('/mean', (req, res, next) => {
  try {
    // Check if nums parameter exists
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    // Split the comma-separated string into array
    const numsAsStrings = req.query.nums.split(',');
    
    // Validate and convert to numbers
    const nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    // Calculate mean and return result
    const mean = findMean(nums);
    res.json({
      operation: 'mean',
      result: mean
    });
  } catch (error) {
    next(error);
  }
});

// Route for calculating median
app.get('/median', (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numsAsStrings = req.query.nums.split(',');
    const nums = convertAndValidateNumsArray(numsAsStrings);
    
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    const median = findMedian(nums);
    res.json({
      operation: 'median',
      result: median
    });
  } catch (error) {
    next(error);
  }
});

// Route for calculating mode
app.get('/mode', (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numsAsStrings = req.query.nums.split(',');
    const nums = convertAndValidateNumsArray(numsAsStrings);
    
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    const mode = findMode(nums);
    res.json({
      operation: 'mode',
      result: mode
    });
  } catch (error) {
    next(error);
  }
});

// Route for calculating all statistics at once
app.get('/all', (req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numsAsStrings = req.query.nums.split(',');
    const nums = convertAndValidateNumsArray(numsAsStrings);
    
    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    res.json({
      operation: 'all',
      mean: findMean(nums),
      median: findMedian(nums),
      mode: findMode(nums)
    });
  } catch (error) {
    next(error);
  }
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  const error = new ExpressError('Route not found', 404);
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  
  res.status(status).json({
    error: {
      message: message,
      status: status
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available routes:');
  console.log('  GET /mean?nums=1,2,3,4,5');
  console.log('  GET /median?nums=1,2,3,4,5');
  console.log('  GET /mode?nums=1,2,3,4,5');
  console.log('  GET /all?nums=1,2,3,4,5');
});

module.exports = app;
