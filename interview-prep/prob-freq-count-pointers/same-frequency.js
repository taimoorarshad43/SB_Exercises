// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
  // Convert numbers to strings to work with digits
  const str1 = num1.toString();
  const str2 = num2.toString();
  
  // If different lengths, frequencies can't be the same
  if (str1.length !== str2.length) return false;
  
  // Create frequency maps for both numbers
  const freq1 = {};
  const freq2 = {};
  
  for (let digit of str1) {
    freq1[digit] = (freq1[digit] || 0) + 1;
  }
  
  for (let digit of str2) {
    freq2[digit] = (freq2[digit] || 0) + 1;
  }
  
  // Compare frequencies
  for (let digit in freq1) {
    if (freq1[digit] !== freq2[digit]) {
      return false;
    }
  }
  
  return true;
}

module.exports = { sameFrequency };
