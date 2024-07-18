let baseURL = 'https://pokeapi.co/api/v2/';
let test ='https://pokeapi.co/api/v2/pokemon/ditto'
let test2 = baseURL +'pokemon/?limit=100&offset=30';

let mewtwo = baseURL + 'pokemon/mewtwo';
let scyther = baseURL + 'pokemon/scyther';
let tentacruel = baseURL + 'pokemon/tentacruel';


function getFacts(url, name){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}

getFacts(mewtwo);
getFacts(scyther);
getFacts(tentacruel);