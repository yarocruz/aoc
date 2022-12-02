const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    // A for Rock, B for Paper, and C for Scissors
    // 0 if you lost, 3 if the round was a draw, and 6 if you won).
    // 1 for Rock, 2 for Paper, and 3 for Scissors

    // opponent - A = Rock, B = Paper, C = Scissor
    // me X = Rock , Y = Paper, Z = Scissor

    let guide = data.split('\n').map(round => round.split(' '))

    score = 0;

    for (let i = 0; i < guide.length; i++) {
        // opponent wins - rock beats scissor
        if (guide[i][0] === 'A' && guide[i][1] === 'Z') {
            score += 3
            //  opponent loses - paper beats rock
        } else if (guide[i][0] === 'A' && guide[i][1] === 'Y') {
            score += 8
            // opponent wins - paper beats rock    
        } else if (guide[i][0] === 'B' && guide[i][1] === 'X') {
            score += 1
            // opponent loses - scissor beats paper    
        } else if (guide[i][0] === 'B' && guide[i][1] === 'Z') {
            score += 9
            // oppnent loses - rock beats scissor     
        } else if (guide[i][0] === 'C' && guide[i][1] === 'X') {
            score += 7
            // opponent wins = scissor beats paper    
        } else if (guide[i][0] === 'C' && guide[i][1] === 'Y') {
            score += 2;
            // if its a tie with rock 
        } else if (guide[i][0] === 'A' && guide[i][1] === 'X') {
            score += 4
            // if its a tie with paper     
        } else if (guide[i][0] === 'B' && guide[i][1] === 'Y') {
            score += 5
            // if its a tie with scissor     
        } else if (guide[i][0] === 'C' && guide[i][1] === 'Z') {
            score += 6
        }
    }

    console.log(score);
})