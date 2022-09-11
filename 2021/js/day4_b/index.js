const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let bingoData = data.split(/\n\n/);
    let bingoNumbers = [...bingoData[0].split(',').map(num => parseInt(num))];

    /* We're pushing into the bingoBoards, an array for 
       every board, and in the the board an array for
       every row */
    let bingoBoards = []
    for (let i = 1; i < bingoData.length; i++) {
        bingoBoards.push(bingoData[i].trim().split('\n').map(line => {
            return line.trim().split(/\s+/).map(num => parseInt(num))
        }));
    }

    // create a clone of bingoBoards to mark the called numbers from board
    let mockBoards = JSON.parse(JSON.stringify(bingoBoards));

    // keep track of numbers being drawn
    let lastCalled;

    let winningBoard;
    let index;

    // start loop through bingNumbers to draw numbers
    for (let i = 0; i < bingoNumbers.length; i++) {
        // start looping through the bingBoards
        console.log(bingoBoards.length, mockBoards.length);
        lastCalled = bingoNumbers[i]
        for (let board = 0; board < bingoBoards.length; board++) {
            for (let row = 0; row < bingoBoards[board].length; row++) {
                for (let col = 0; col < bingoBoards[board][row].length; col++) {
                    // finally here we check if number called is in one of the boards
                    if (bingoNumbers[i] === mockBoards[board][row][col]) {
                        mockBoards[board][row][col] = 'marked'
                    }
                }
            }

        }
        // loop again through each board to find winners and splice them out the mockbaord
        for (let bd = 0; bd < bingoBoards.length; bd++) {
            if (findWinningBoard(mockBoards)) {
                const [winner, index] = findWinningBoard(mockBoards)
                // every time we find a winner we remove that board 
                // from both, the mockBoards, and the bingoBoard
                //console.log(winner, "winner?")
                mockBoards.splice(index, 1)
                bingoBoards.splice(index, 1)
                winningBoard = JSON.parse(JSON.stringify(winner));
                console.log(winningBoard)
                //console.log(mockBoards)
                console.log(lastCalled);
                console.log(lastCalled, findBoardScore(winningBoard));
                console.log(lastCalled * findBoardScore(winningBoard));
            }
        }


    }
    // console.log(lastCalled, findBoardScore(winningBoard));
    // console.log(lastCalled * findBoardScore(winningBoard));
})

function findBoardScore(winningBoard) {
    let score = 0
    for (let i = 0; i < winningBoard.length; i++) {
        for (let j = 0; j < winningBoard[i].length; j++) {
            if (winningBoard[i][j] !== 'marked') {
                score += winningBoard[i][j]
            }
        }
    }
    return score;
}

function findWinningBoard(mockBoards) {
    let count = 0

    for (let board = 0; board < mockBoards.length; board++) {
        // check for winner in row
        for (let row = 0; row < mockBoards[board].length; row++) {
            for (let col = 0; col < mockBoards[board][row].length; col++) {
                // finally here we check if number called is in one of the boards
                if (mockBoards[board][row][col] === 'marked') {
                    count += 1
                }
            }
            // if we found five marked in a row, this board is a winner
            if (count === 5) {
                //console.log(mockBoards[board]);
                return [mockBoards[board], board]
            }
            count = 0
        }
        // check for winner in column
        for (let col = 0; col < mockBoards[board][0].length; col++) {
            for (let row = 0; row < mockBoards[board][col].length; row++) {
                // finally here we check if number called is in one of the boards
                if (mockBoards[board][row][col] === 'marked') {
                    count += 1
                }
            }
            // if we found five marked in a col, this board is a winner
            if (count === 5) {
                return [mockBoards[board], board]
            }
            count = 0
        }

    }
}





