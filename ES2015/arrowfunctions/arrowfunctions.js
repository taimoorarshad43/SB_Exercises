// ES5 Version

function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}

function squareAndFindEvens(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
}


// ES2015 Version

const double = (arr) => {
  return arr.map(val => val * 2);
}

const squareAndFindEvens = (numbers) => {
  const squares = numbers.map(num => num ** 2);
  const evens = squares.filter(square => square % 2 === 0);
  return evens;
}