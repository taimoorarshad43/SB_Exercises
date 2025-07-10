function sortedFrequency(arr, num) {
  function findFirst() {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === num) {
        result = mid;
        right = mid - 1;
      } else if (arr[mid] < num) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  function findLast() {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === num) {
        result = mid;
        left = mid + 1;
      } else if (arr[mid] < num) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  let first = findFirst();
  if (first === -1) return -1;
  let last = findLast();
  return last - first + 1;
}

module.exports = sortedFrequency