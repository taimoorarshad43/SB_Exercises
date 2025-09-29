/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start = 0, end = arr.length - 1) {
  // Helper function to swap elements
  function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  // Choose the first element as pivot
  const pivot = arr[start];
  let swapIdx = start;
  
  // Partition the array
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  
  // Move pivot to its correct position
  swap(arr, start, swapIdx);
  
  return swapIdx;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
  // Base case: if left >= right, the subarray has 0 or 1 element
  if (left < right) {
    // Partition the array and get the pivot index
    const pivotIndex = pivot(arr, left, right);
    
    // Recursively sort the left and right subarrays
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  
  return arr;
}

module.exports = { pivot, quickSort };