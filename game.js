let gameEnded = false;
const player1 = 'X';
const player2 = 'O';
let player_user = player1;
const resultText = document.getElementById('resultText');
let xyValue = 3;
let gameArray = [];

// Function to select game
function selectBoard(val) {
    xyValue = val;
    gameArray = newGameArray();
    console.log(gameArray)
    const tableNode = document.createElement("table");
    tableNode.setAttribute("border", '1');
    for (let i = 0; i < xyValue; ++i) {
        let trNode = document.createElement("tr");
        for (let j = 0; j < xyValue; ++j) {
            var tdNode = document.createElement("td");
            tdNode.setAttribute("id", i + '' + j);
            tdNode.setAttribute("class", "game-row");
            tdNode.setAttribute("onclick", "boxPressed(this)");
            trNode.appendChild(tdNode);
        }
        tableNode.appendChild(trNode);
    }
    document.getElementById("table").appendChild(tableNode);
    document.getElementById("options").style.display = "none";
    document.getElementById("game-box").style.display = "grid";

}

// This function represents player: user
function boxPressed(btn) {
    let pressedRow = btn.getAttribute("id").split('');
    const row1 = +pressedRow[0];
    const row2 = +pressedRow[1];
    gameLogic(row1, row2, player1);
}

// This function represents player: Computer
function playerComp() {
    const emptySlots = getEmptySlots();
    if (emptySlots.length === 0) {
        return false;
    }
    const selectedSlot = randomNumber(0, emptySlots.length - 1);
    const row1 = +emptySlots[selectedSlot].row1;
    const row2 = +emptySlots[selectedSlot].row2;
    gameLogic(row1, row2, player2);
}

// Game logic
function gameLogic(row1, row2, marker) {
    if (gameEnded || gameArray[row1][row2] !== '') {
        return;
    }
    document.getElementById(row1 + '' + row2).innerHTML = marker;
    gameArray[row1][row2] = marker;
    const winStreak = getWinStreak(marker);
    if (winStreak.success) {
        console.log(winStreak)
        const wsData = winStreak.data;
        gameEnded = true;
        if (player_user === marker) {
            resultText.innerHTML = 'You won!';
            resultText.style.color = "green";
            for (let i = 0; i < wsData.length; ++i) {
                console.log(wsData[i].row1, wsData[i].row2)
                document.getElementById(wsData[i].row1 + '' + wsData[i].row2).style.color = 'green';
            }
        }
        else {
            resultText.innerHTML = 'You lose!'
            resultText.style.color = "red";
            for (let i = 0; i < wsData.length; ++i) {
                document.getElementById(wsData[i].row1 + '' + wsData[i].row2).style.color = 'red';
            }
        }
        return;
    }
    if (getEmptySlots().length === 0) {
        gameEnded = true;
        resultText.innerHTML = 'Match Tie!';
        resultText.style.color = "orange";
        return;
    }
    if (!gameEnded && player_user === marker) {
        playerComp();
    }
}



// Function to start new game
function newGame() {
    gameArray = newGameArray();
    gameEnded = false;
    const gameRows = document.getElementsByClassName('game-row');
    resultText.innerHTML = '';
    resultText.style.color = null;
    for (var i = 0; i < gameRows.length; i++) {
        gameRows[i].innerHTML = "";
        gameRows[i].style.color = null;
    }
}


// Function to generate 3x3 array
function newGameArray() {
    let array = new Array();
    for (let i = 0; i < xyValue; ++i) {
        array[i] = new Array();
        for (let j = 0; j < xyValue; ++j) {
            array[i][j] = '';
        }
    }
    return array;
}

// Function to generate random number  
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Function to get empty slots in game
function getEmptySlots() {
    const emptyGameArray = [];
    for (let i = 0; i < xyValue; ++i) {
        for (let j = 0; j < xyValue; ++j) {
            if (gameArray[i][j] === '') {
                emptyGameArray.push({ row1: i, row2: j });
            }
        }
    }
    return emptyGameArray;
}

// Function to check matching XO
function getWinStreak(player) {
    let horizontalStreak = [];
    let verticalStreak = [];
    let diagonalStreak1 = [];
    let diagonalStreak2 = [];
    for (let i = 0; i < xyValue; ++i) {
        horizontalStreak = [];
        verticalStreak = [];
        for (let j = 0; j < xyValue; ++j) {
            if (gameArray[i][j] === player) {
                horizontalStreak.push({ row1: i, row2: j });
                if (horizontalStreak.length === xyValue) {
                    return { success: true, type: 'horizontal', data: horizontalStreak };
                }
            }
            if (gameArray[j][i] === player) {
                verticalStreak.push({ row1: j, row2: i });
                if (verticalStreak.length === xyValue) {
                    return { success: true, type: 'vertical', data: verticalStreak };
                }
            }
        }
        if (gameArray[i][i] === player) {
            diagonalStreak1.push({ row1: i, row2: i });
            if (diagonalStreak1.length === xyValue) {
                return { success: true, type: 'diagonal1', data: diagonalStreak1 };
            }
        }
        if (gameArray[i][xyValue - i] === player) {
            diagonalStreak2.push({ row1: i, row2: xyValue - i });
            if (diagonalStreak2.length === xyValue) {
                return { success: true, type: 'diagonal2', data: diagonalStreak2 };
            }
        }
    }
    return { success: false };
}