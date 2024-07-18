function selectionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let min = arr[i];
        let key = i;
        for(let j = i+1; j < arr.length; j++){
            if(arr[j] < min){
                min = arr[j];
                key = j;
            }
        }
        if(min < arr[i]) {
            let temp = arr[i];
            arr[i] = min;
            arr[key] = temp;
        }
    }
    return arr;
}

module.exports = selectionSort;