function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
    return num.toString().length;
}

function mostDigits(arr) {
    let maxDigits = 0;
    for (let i = 0; i < arr.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(arr[i]));
    }
    return maxDigits;
}

function radixSort(arr) {
    let maxDigits = mostDigits(arr);
    for (let i = 0; i < maxDigits; i++) {
        let buckets = [[],[],[],[],[],[],[],[],[],[]]
        for (let j = 0; j < arr.length; j++) {
            let digit = getDigit(arr[j], i);
            buckets[digit].push(arr[j]);
        }
       arr = [].concat(...buckets);
    }
    return arr;
}


module.exports = radixSort;