// let num = prompt("What number do you want?");

// let url = 'http://numbersapi.com/' + num + '/trivia?json'
let favNum = 23;

let rangeURL = 'http://numbersapi.com/1..3?json'
let favURL = 'http://numbersapi.com/' + favNum + '?json'

function getNumberRange(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            const body = document.body;
            const listbody = document.createElement('ul');

            const numberfacts = [];

            for(let i = 1; i <= 3; i++){
                numberfacts.push(data[i]);
            }

            console.log(data);
            console.log(numberfacts);

            numberfacts.forEach(fact => {
                const listitem = document.createElement('li');
                listitem.textContent = fact;
                listbody.appendChild(listitem);
            });

            body.appendChild(listbody);
            
        })
        .catch(err => console.log(err));
}

function getFavoriteNumber(favURL){
    for(let i = 0; i < 4; i++){
       fetch(favURL)
            .then(response => response.json())
            .then(data => {
                console.log(data.text);
                const body = document.body;
                const paragraph = document.createElement('p');

                paragraph.textContent = data.text;

                body.appendChild(paragraph);
                
            })
            .catch(err => console.log(err));
    }
}

// getNumberRange(rangeURL);
getFavoriteNumber(favURL);

// fetch(url)
//     .then(response => console.log(response))
//     .catch(err => console.log(err));

// console.log(data);