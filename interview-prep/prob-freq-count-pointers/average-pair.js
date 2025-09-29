// add whatever parameters you deem necessary
function averagePair(arr, targetAvg) {
  // If array has less than 2 elements, no pairs possible
  if (arr.length < 2) return false;
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const currentAvg = (arr[left] + arr[right]) / 2;
    
    if (currentAvg === targetAvg) {
      return true;
    } else if (currentAvg < targetAvg) {
      left++;
    } else {
      right--;
    }
  }
  
  return false;
}

module.exports = { averagePair };
