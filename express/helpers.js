// Helper functions for statistical calculations

/**
 * Validates and converts an array of strings to numbers
 * @param {Array} numsAsStrings - Array of string numbers
 * @returns {Array|Error} Converted array or error if invalid
 */
function convertAndValidateNumsArray(numsAsStrings) {
  const result = [];
  
  for (let i = 0; i < numsAsStrings.length; i++) {
    const num = Number(numsAsStrings[i]);
    
    if (isNaN(num)) {
      return new Error(`"${numsAsStrings[i]}" is not a valid number at index ${i}`);
    }
    
    result.push(num);
  }
  
  return result;
}

/**
 * Calculate the mean (average) of an array of numbers
 * @param {Array} nums - Array of numbers
 * @returns {number} The mean value
 */
function findMean(nums) {
  if (nums.length === 0) return 0;
  
  const sum = nums.reduce((total, num) => total + num, 0);
  return sum / nums.length;
}

/**
 * Calculate the median of an array of numbers
 * @param {Array} nums - Array of numbers
 * @returns {number} The median value
 */
function findMedian(nums) {
  if (nums.length === 0) return 0;
  
  // Create a copy and sort it (don't mutate original)
  const sortedNums = [...nums].sort((a, b) => a - b);
  const length = sortedNums.length;
  
  if (length % 2 === 0) {
    // Even number of elements - average the two middle numbers
    const mid1 = sortedNums[length / 2 - 1];
    const mid2 = sortedNums[length / 2];
    return (mid1 + mid2) / 2;
  } else {
    // Odd number of elements - return the middle number
    return sortedNums[Math.floor(length / 2)];
  }
}

/**
 * Create a frequency counter object from an array
 * @param {Array} arr - Array of elements
 * @returns {Object} Object with element counts
 */
function createFrequencyCounter(arr) {
  const counter = {};
  
  for (const item of arr) {
    counter[item] = (counter[item] || 0) + 1;
  }
  
  return counter;
}

/**
 * Find the mode (most frequent number) in an array
 * @param {Array} nums - Array of numbers
 * @returns {number} The mode value
 */
function findMode(nums) {
  if (nums.length === 0) return 0;
  
  const frequencyCounter = createFrequencyCounter(nums);
  
  let maxCount = 0;
  let mode = nums[0]; // Default to first number
  
  for (const [num, count] of Object.entries(frequencyCounter)) {
    if (count > maxCount) {
      maxCount = count;
      mode = Number(num);
    }
  }
  
  return mode;
}

module.exports = {
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode,
  createFrequencyCounter
};
