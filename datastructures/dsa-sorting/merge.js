function merge(arr1, arr2) {
  const result = [];
  let i = 0; // pointer for arr1
  let j = 0; // pointer for arr2
  
  // Compare elements from both arrays and add smaller one to result
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements from arr1
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  
  // Add remaining elements from arr2
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  
  return result;
}

function mergeSort(arr) {
  // Base case: array with 0 or 1 element is already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Find middle point
  const mid = Math.floor(arr.length / 2);
  
  // Divide array into two halves
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

module.exports = { merge, mergeSort};