// ES5 version

function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}

// ES2015 Version

function filterOutOdds(...nums) {
  return nums.filter(num => num % 2 === 0);
}


// findMin()

findMin(1,4,12,-3) // -3
findMin(1,-1) // -1
findMin(3,1) // 1

const findMin = (...args) => Math.min(...args);

// mergeObjects()
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});


// doubleAndReturnArgs()
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(v => v * 2)];

// Slice and Dice
const removeRandom = items => {
  let idx = Math.floor(Math.random() * items.length);
  return [...items.slice(0, idx), ...items.slice(idx + 1)];
};

const extend = (array1, array2) => {
  return [...array1, ...array2];
}

const addKeyVal = (obj, key, val) => {
  return { ...obj, [key]: val };
};

const removeKey = (obj, key) => {
  let newObj = { ...obj };
  delete newObj[key];
  return newObj;
}

const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

const update = (obj, key, val) => {
  return { ...obj, [key]: val };
}

