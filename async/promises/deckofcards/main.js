// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
// draws two cards from existing deck. If "new" is used then new deck is created as well drawing number of cards

// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// Creates new deck to be used and manipulated. Discarded after two weeks if no action is taken.

// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/?remaining=true
// Reshuffle an existing deck of cards.

// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/?remaining=true
// reshuffle the deck. Add the remaining = true arg to keep the cards that are drawn outside of deck.

//"l8v28y3v2zvb" - deck ID

let makeDeckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let deckID = 'l8v28y3v2zvb';
// let drawURL = 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1'
let drawURL = 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/'
let reshuffleURL = 'https://deckofcardsapi.com/api/deck/' + deckID + '/shuffle/'
let deckCheckURL = 'https://deckofcardsapi.com/api/deck/' + deckID


let cardcount = 0;
const body = document.body;

function clearPile(){
    const myNode = document.getElementById("cardContainer");
    myNode.textContent = '';
    shuffleCards(reshuffleURL);
}

function getNewDeck(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            deckID = data.deckID;
            
        })
        .catch(err => console.log(err));
}

function drawACard(url){
    console.log(deckID);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // const body = document.body;
            let img = document.createElement('img');
            
            //Setting image, alt, and class names
            img.src = data.cards[0].image;
            img.alt = data.cards[0].code;
            img.className = img.alt;

            //Setting tilt and position styles
            const tilt = Math.random() * 90 - 45; // should return a number between -45 and 45
            const xpos = Math.random() * 200;
            const ypos = Math.random() * 200;

            img.style.transform = `rotate(${tilt}deg)`;
            img.style.top = `${ypos}px`;
            img.style.left = `${xpos}px`;

            img.style.position = 'absolute';
            img.style.transition = `0.3s`;

            let cardContainer = document.getElementById('cardContainer');

            cardContainer.appendChild(img);
            console.log(data);
            
        })
        .catch(err => console.log(err));
}

function shuffleCards(url, remaining = false){
    let fetchurl = url;
    if(remaining){
       fetchurl = url + '?remaining=true' 
    }
    fetch(fetchurl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            deckID = data.deckID;
            
        })
        .catch(err => console.log(err));
}

function deckStatus(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        deckID = data.deckID;
        
    })
    .catch(err => console.log(err));
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('drawCard').addEventListener("click", () => {drawACard(drawURL)});
    document.getElementById('clearAndShuffle').addEventListener("click", clearPile);
})
// getNewDeck(makeDeckURL);
// deckStatus(deckCheckURL);
// shuffleCards(reshuffleURL);
// drawACard(drawURL);
// drawACard(drawURL);
// drawACard(drawURL);
// drawACard(drawURL);
// drawACard(drawURL);
// drawACard(drawURL);
// drawACard(drawURL);