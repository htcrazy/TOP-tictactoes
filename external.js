(function() {
    const player1 = {
        name : 'Player 1',
        score : 0
    };
    const player2 = {
        name: 'Player 2',
        score : 0
    }

    const changeP1Name = document.getElementById('setP1Name');
    const p1Name = document.getElementById('p1Name');
    changeP1Name.addEventListener('click', function() {
        getP1Name = document.getElementById('getP1Name');
        player1.name = getP1Name.value;
        p1Name.innerText = player1.name;
        getP1Name.value = '';
    })

    const changeP2Name = document.getElementById('setP2Name');
    const p2Name = document.getElementById('p2Name');
    changeP2Name.addEventListener('click', function() {
        getP2Name = document.getElementById('getP2Name');
        player2.name = getP2Name.value;
        p2Name.innerText = player2.name;
        getP2Name.value = '';
    })

    const gameboard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    let turn = 0;
    let winner = 'none';

    const onTheClick = document.querySelectorAll('.gridSquare');
    onTheClick.forEach(function(div) {
        div.addEventListener('click', function() {
            if (winner == 'none') {
                const coord = String(div.id).substring(1,3);
                const row = coord.charAt(0)
                const col = coord.charAt(1)
                const value = gameboard[row][col]
    
                if (value == -1) {
                    if (turn % 2 == 0) {
                        gameboard[row][col] = 0;
                    } else {
                        gameboard[row][col] = 1;
                    }
                    turn++
                    declareTurn();
                }
                gameboardUpdate();
                checkWinner(row, col);
            }
        });
    });

    const gameMessage = document.getElementById('gameMessage');
    const declareTurn = function() {
        if (turn % 2 == 0) {
            gameMessage.innerText = player1.name + "'s turn";
        } else {
            gameMessage.innerText = player2.name + "'s turn";
        }
    };

    const gameboardUpdate = function() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                let boardgameSquare = gameboard[row][col];
                if (boardgameSquare == -1) {
                    document.getElementById('g' + row + col).innerText = '';
                } else if (boardgameSquare == 0) {
                    document.getElementById('g' + row + col).innerText = 'O';
                } else {
                    document.getElementById('g' + row + col).innerText = 'X';
                }
            }
        }
    };

    const checkWinner = function(row, col) {

        if (gameboard[row][0] == 0 && gameboard[row][1] == 0 && gameboard[row][2] == 0) {
            winner = 'player1';
            document.getElementById('g' + row + '0').setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + row + '1').setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + row + '2').setAttribute('class','gridSquare greenBg');
        } else if (gameboard[0][col] == 0 && gameboard[1][col] == 0 && gameboard[2][col] == 0) {
            winner = 'player1';
            document.getElementById('g' + '0' + col).setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + '1' + col).setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + '2' + col).setAttribute('class','gridSquare greenBg');
        } else if (gameboard[2][0] == 0 && gameboard[1][1] == 0 && gameboard[0][2] == 0) {
            winner = 'player1';
            document.getElementById('g20').setAttribute('class','gridSquare greenBg');
            document.getElementById('g11').setAttribute('class','gridSquare greenBg');
            document.getElementById('g02').setAttribute('class','gridSquare greenBg');
        } else if (gameboard[0][0] == 0 && gameboard[1][1] == 0 && gameboard[2][2] == 0) {
            winner = 'player1';
            document.getElementById('g00').setAttribute('class','gridSquare greenBg');
            document.getElementById('g11').setAttribute('class','gridSquare greenBg');
            document.getElementById('g22').setAttribute('class','greenBg gridSquare');
        } else if (gameboard[row][0] == 1 && gameboard[row][1] == 1 && gameboard[row][2] == 1) {
            winner = 'player2';
            document.getElementById('g' + row + '0').setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + row + '1').setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + row + '2').setAttribute('class','gridSquare greenBg');
        } else if (gameboard[0][col] == 1 && gameboard[1][col] == 1 && gameboard[2][col] == 1) {
            winner = 'player2';
            document.getElementById('g' + '0' + col).setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + '1' + col).setAttribute('class','gridSquare greenBg');
            document.getElementById('g' + '2' + col).setAttribute('class','gridSquare greenBg');
        } else if (gameboard[2][0] == 1 && gameboard[1][1] == 1 && gameboard[0][2] == 1) {
            winner = 'player2';
            document.getElementById('g20').setAttribute('class','gridSquare greenBg');
            document.getElementById('g11').setAttribute('class','gridSquare greenBg');
            document.getElementById('g02').setAttribute('class','gridSquare greenBg');
        } else if (gameboard[0][0] == 1 && gameboard[1][1] == 1 && gameboard[2][2] == 1) {
            winner = 'player2';
            document.getElementById('g00').setAttribute('class','gridSquare greenBg');
            document.getElementById('g11').setAttribute('class','gridSquare greenBg');
            document.getElementById('g22').setAttribute('class','greenBg gridSquare');
        }
        declareWinner();
    }

    const declareWinner = function() {
        let fullBoard = true;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (gameboard[row][col] == -1) {
                    fullBoard = false;
                }
            }
        }

        if (winner == 'player1'){
            gameMessage.innerText = player1.name + ' wins the game!';
            player1.score++;
            document.getElementById('p1Score').innerText = player1.score;
        } else if (winner == 'player2') {
            gameMessage.innerText = player2.name + ' wins the game!';
            player2.score++;
            document.getElementById('p2Score').innerText = player2.score;
        } else if (fullBoard) {
            gameMessage.innerText = "It's a tie game!";
            winner = 'tie';
        }
    }

    const resetBoard = document.getElementById('restart');
    resetBoard.addEventListener('click', function() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                gameboard[row][col] = -1;
                document.getElementById('g' + row + col).setAttribute('class','gridSquare');
                winner = 'none';
            }
        }
        gameboardUpdate();
        declareTurn();
    })
})();
