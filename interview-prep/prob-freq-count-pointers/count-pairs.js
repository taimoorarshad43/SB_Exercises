// add whatever parameters you deem necessary
function countPairs(arr, targetSum) {
  // If array has less than 2 elements, no pairs possible
  if (arr.length < 2) return 0;
  
  let count = 0;
  let left = 0;
  let right = arr.length - 1;
  
  // Sort the array first (O(N log N))
  arr.sort((a, b) => a - b);
  
  // Use two pointers approach
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === targetSum) {
      count++;
      left++;
      right--;
    } else if (sum < targetSum) {
      left++;
    } else {
      right--;
    }
  }
  
  return count;
}

module.exports = { countPairs };
