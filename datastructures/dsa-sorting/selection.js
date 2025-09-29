function selectionSort(arr) {
  // Make a copy of the array to avoid mutating the original
  const result = [...arr];
  
  // One by one move boundary of unsorted subarray
  for (let i = 0; i < result.length - 1; i++) {
    // Find the minimum element in unsorted array
    let minIndex = i;
    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  
  return result;
}

module.exports = selectionSort;