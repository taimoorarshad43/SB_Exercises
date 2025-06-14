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

// let drawURL = 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1'
// let drawURL = 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/'
// let reshuffleURL = 'https://deckofcardsapi.com/api/deck/' + deckID + '/shuffle/'
// let deckCheckURL = 'https://deckofcardsapi.com/api/deck/' + deckID


let makeDeckURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let baseURL = 'https://deckofcardsapi.com/api/deck/';

// We'll set these later
let reshuffleURL = null;
let deckCheckURL = null;
let drawURL = null;
let deckID = null;

let cardcount = 0;
const body = document.body;

// Clears HTML deck pile and gets new pile.
function clearPile(){
    const myNode = document.getElementById("cardContainer");
    myNode.textContent = '';
    getNewDeck(makeDeckURL);
    shuffleCards(reshuffleURL);
}

// Gets new DeckID and sets other API URLs.
async function getNewDeck(url){
    try{
        response = await fetch(url);
        data = await response.json();
        console.log(data);

        //Set DeckID and URLs
        deckID = data.deck_id
        drawURL = baseURL + deckID + '/draw/'
        reshuffleURL = baseURL + deckID + '/shuffle/'
        deckCheckURL = baseURL + deckID

    }catch(err){
        console.log(err);
    }

}

// Will both draw a card and get a new deck if none exists already
async function drawACard(url){
    if(!deckID){
        console.log(deckID)
        getNewDeck(makeDeckURL);
        return;
    }
    try{
        response = await fetch(url);
        data = await response.json();

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
    }catch(err){
        console.log(err);
    }
}

//Will shuffle cards, gets called by clearPile()
async function shuffleCards(url, remaining = false){
    let fetchurl = url;
    if(remaining){
       fetchurl = url + '?remaining=true' 
    }
    try{
        let response = await fetch(fetchurl);
        let data = await response.json();
        console.log(data);
        deckID = data.deck_id;
    }catch(err){
        console.log(err);
    }        
}

//Debug function, not part of main gameplay loop
async function deckStatus(url){
    try{
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        deckID = data.deck_id;
    }catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('drawCard').addEventListener("click", () => {drawACard(drawURL)});
    document.getElementById('clearAndShuffle').addEventListener("click", clearPile);
})