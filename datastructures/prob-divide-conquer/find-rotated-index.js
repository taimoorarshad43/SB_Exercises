function findRotatedIndex(arr, num) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) return mid;
    // Left side is sorted
    if (arr[left] <= arr[mid]) {
      if (num >= arr[left] && num < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else { // Right side is sorted
      if (num > arr[mid] && num <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

module.exports = findRotatedIndex