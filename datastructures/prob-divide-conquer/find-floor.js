function findFloor(arr, num) {
  let left = 0, right = arr.length - 1;
  let result = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) return arr[mid];
    if (arr[mid] < num) {
      result = arr[mid];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

module.exports = findFloor