function bubbleSort(arr) {
  // Make a copy of the array to avoid mutating the original
  const result = [...arr];
  
  // Outer loop - number of passes through the array
  for (let i = 0; i < result.length; i++) {
    let swapped = false;
    
    // Inner loop - compare adjacent elements
    for (let j = 0; j < result.length - 1 - i; j++) {
      // If current element is greater than next element, swap them
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return result;
}

module.exports = bubbleSort;