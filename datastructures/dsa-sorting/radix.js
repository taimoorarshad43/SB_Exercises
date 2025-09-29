// Helper function to get the digit at a specific place
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Helper function to count the number of digits in a number
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// Helper function to find the maximum number of digits in an array
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums) {
  // Make a copy of the array to avoid mutating the original
  const result = [...nums];
  
  // Find the maximum number of digits
  const maxDigitCount = mostDigits(result);
  
  // Loop through each digit place (0 to maxDigitCount - 1)
  for (let k = 0; k < maxDigitCount; k++) {
    // Create 10 buckets (0-9) for each digit
    const digitBuckets = Array.from({ length: 10 }, () => []);
    
    // Distribute numbers into buckets based on current digit
    for (let i = 0; i < result.length; i++) {
      const digit = getDigit(result[i], k);
      digitBuckets[digit].push(result[i]);
    }
    
    // Concatenate all buckets back into the array
    result.length = 0; // Clear the array
    for (let i = 0; i < digitBuckets.length; i++) {
      result.push(...digitBuckets[i]);
    }
  }
  
  return result;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };