const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let flippedCounter = 0;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("in-play");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  console.log("flippedCounter is: ", flippedCounter);

  // Preventing the user from clicking on more than two cards at a time
  // and resetting the cards 
  if(flippedCounter > 1) {
    flippedCounter = 0;
    const allCards = document.querySelectorAll(".in-play");
    allCards.forEach((card) => {
      card.classList.remove("flipped");
      card.style.backgroundColor = "";
    });
    return;
  }else{
    flippedCounter++;
  }

  // Getting the card and toggling it's color.
  const clickedDiv = event.target;
  clickedDiv.classList.toggle("flipped");
  if(clickedDiv.classList.contains("flipped")) {
    clickedDiv.style.backgroundColor = clickedDiv.classList[0];
  }
  else {
    clickedDiv.style.backgroundColor = "";
  }
  // Checking if two cards are matched
  checkForMatch();
}

// Function to check if two cards match
function checkForMatch() {
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    if (flippedCards[0].className === flippedCards[1].className) {
      flippedCards[0].removeEventListener("click", handleCardClick);
      flippedCards[1].removeEventListener("click", handleCardClick);
      flippedCards[0].classList.remove("in-play");
      flippedCards[1].classList.remove("in-play");
      flippedCards[0].classList.remove("flipped");
      flippedCards[1].classList.remove("flipped");
      flippedCounter = 0;   // Resetting the counter
    } else {
      setTimeout(() => {
        flippedCards[0].classList.remove("flipped");
        flippedCards[1].classList.remove("flipped");
        flippedCards[0].style.backgroundColor = "";
        flippedCards[1].style.backgroundColor = "";
      }, 1000);
    }
  }
  if (document.querySelectorAll(".in-play").length === 0) {
    alert("You win!");
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);