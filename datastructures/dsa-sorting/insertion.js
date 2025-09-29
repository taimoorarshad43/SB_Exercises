function insertionSort(arr) {
  // Make a copy of the array to avoid mutating the original
  const result = [...arr];
  
  // Start from the second element (index 1)
  for (let i = 1; i < result.length; i++) {
    const currentElement = result[i];
    let j = i - 1;
    
    // Move elements of the sorted portion that are greater than current element
    // one position ahead of their current position
    while (j >= 0 && result[j] > currentElement) {
      result[j + 1] = result[j];
      j--;
    }
    
    // Place current element in its correct position
    result[j + 1] = currentElement;
  }
  
  return result;
}

module.exports = insertionSort;