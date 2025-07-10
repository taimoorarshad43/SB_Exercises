function findRotationCount(arr) {
  let left = 0, right = arr.length - 1;
  let n = arr.length;
  while (left <= right) {
    if (arr[left] <= arr[right]) return left;
    let mid = Math.floor((left + right) / 2);
    let next = (mid + 1) % n;
    let prev = (mid - 1 + n) % n;
    if (arr[mid] <= arr[next] && arr[mid] <= arr[prev]) return mid;
    if (arr[mid] >= arr[left]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return 0;
}

module.exports = findRotationCount