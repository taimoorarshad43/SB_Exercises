function merge(arr1, arr2) {
    const results = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            results.push(arr1[i]);
            i++;
        } else {
            results.push(arr2[j]);
            j++;
        }
    }
    //One of the two arr pointers will spill over, when that happens, one of these loops will copy the rest
    //of the array into the results array.
    while(i < arr1.length){
        results.push(arr1[i]);
        i++;
    }
    while(j < arr2.length){
        results.push(arr2[j]);
        j++;
    }
    return results;
}

function mergeSort(arr){
    //base case
    if(arr.length <= 1) return arr;

    //non-base case
    const mid = Math.floor(arr.length/2)
    const left = mergeSort(arr.slice(0,mid));
    const right = mergeSort(arr.slice(mid,arr.length));
    
    return merge(left, right);
}


module.exports = { merge, mergeSort};