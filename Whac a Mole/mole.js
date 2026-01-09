let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let moleInterval;
let plantInterval;

window.onload = function () {
    setGame();
    document.getElementById("restartBtn").addEventListener("click", restartGame);
}

function setGame() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score;
    } 
    else if (this === currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score;
        gameOver = true;
        clearInterval(moleInterval);
        clearInterval(plantInterval);
    }
}

function restartGame() {
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;

    clearInterval(moleInterval);
    clearInterval(plantInterval);

    document.getElementById("score").innerText = "0";
    setGame();
}
