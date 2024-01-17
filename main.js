let url = './tiles.json';
fetch(url).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
    var tilesShowcaseCivil = document.querySelector('.tiles-showcase-civil');
    var tilesShowcaseMilitary = document.querySelector('.tiles-showcase-military');
    data.forEach(function(tile) {
        console.log(tile);
        
        if(tile.tileType == 'civil'){
            tilesShowcaseCivil.innerHTML += `
                <div class="tile">
                <img src=${tile.icon}>
                <p >${tile.cname}</p>
                </div>
            `;           
        }else{
            tilesShowcaseMilitary.innerHTML += `
                <div class="tile">
                <img src=${tile.icon}>
                <p >${tile.cname}</p>
                </div>
            `;  
        }
    })
    window.tiles = data;
}).catch(function(err) {
    console.log('Fetch Error :-S', err);
});

function pickTile(){
    //pick a random tile.
    let tiles = window.tiles;
    let tileIndex = getRandomIntInclusive(0, tiles.length-1);
    let pickedTile = tiles[tileIndex];
    console.log(pickedTile);
    let tilePracticeZoneTile = document.querySelector('.tile-practice-zone .tile');
    tilePracticeZoneTile.innerHTML = `  
        <img src=${pickedTile.icon}>
    `;

    //show 3 possible tile names. 
    let tileIndex2 = getRandomIntInclusive(0, tiles.length-1);
    while(tiles[tileIndex2].cname == pickedTile.cname){
        tileIndex2 = getRandomIntInclusive(0, tiles.length-1);
    }
    let tileIndex3 = getRandomIntInclusive(0, tiles.length-1);
    while(tiles[tileIndex3].cname == pickedTile.cname
            || tiles[tileIndex3].cname == tiles[tileIndex2].cname){
                tileIndex3 = getRandomIntInclusive(0, tiles.length-1);
    }     
    let pickedTile2 = tiles[tileIndex2];
    let pickedTile3 = tiles[tileIndex3];

    possibleOptions = [];
    possibleOptions.push({name: pickedTile.name, cname: pickedTile.cname, correct: true});
    possibleOptions.push({name: pickedTile2.name, cname: pickedTile2.cname, correct: false});
    possibleOptions.push({name: pickedTile3.name, cname: pickedTile3.cname, correct: false});

    shuffleArray(possibleOptions);
    let tilePracticeZonePossibleOptions = document.querySelector('.tile-practice-zone .possible-options');
    tilePracticeZonePossibleOptions.innerHTML = `  
        <button onclick="checkAnswer(${possibleOptions[0].correct})"> ${possibleOptions[0].cname} </button>
        <button onclick="checkAnswer(${possibleOptions[1].correct})"> ${possibleOptions[1].cname} </button>
        <button onclick="checkAnswer(${possibleOptions[2].correct})"> ${possibleOptions[2].cname} </button>
    `;
}

function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    let randomNumber = randomBuffer[0] / (0xffffffff + 1);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkAnswer(correct){
    var scoreElement = document.querySelector('.tile-practice-zone .score-zone .score');
    var score = parseInt(scoreElement.innerHTML)
    if(correct){
       score = score + 1;
       scoreElement.innerHTML = score;
       pickTile();
    }else{
        score = score - 1;
        scoreElement.innerHTML = score;
    }
}