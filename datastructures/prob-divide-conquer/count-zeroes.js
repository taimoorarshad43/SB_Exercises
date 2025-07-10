function countZeroes(arr) {
  let left = 0;
  let right = arr.length - 1;
  let firstZero = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === 0) {
      firstZero = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return firstZero === -1 ? 0 : arr.length - firstZero;
}

module.exports = countZeroes