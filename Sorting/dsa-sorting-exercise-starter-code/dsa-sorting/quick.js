/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start = 0, end = arr.length - 1) {
    const swap = (array, i, j) => {
        [array[i], array[j]] = [array[j], array[i]];
    };

    let pivotValue = arr[start];
    let swapIdx = start;
    // Pivot is always first element - not random
    for (let i = start + 1; i <= end; i++) {
        if (arr[i] < pivotValue) {
            swapIdx++;
            swap(arr, swapIdx, i);
        }
    }

    //One last swap to get the pivot into the partition
    swap(arr, start, swapIdx);
    return swapIdx;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right);

        // Recursively sort the left side of the pivot
        quickSort(arr, left, pivotIndex - 1);

        // Recursively sort the right side of the pivot
        quickSort(arr, pivotIndex + 1, right);
    }
    return arr;
}

module.exports = quickSort;