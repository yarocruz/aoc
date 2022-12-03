const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    // A for Rock, B for Paper, and C for Scissors
    // 0 if you lost, 3 if the round was a draw, and 6 if you won).
    // 1 for Rock, 2 for Paper, and 3 for Scissors

    // opponent - A = Rock, B = Paper, C = Scissor
    // me X = Rock , Y = Paper, Z = Scissor

    // X means I need to lose, Y means I neead to draw, Z means I need to win

    let guide = data.split('\n').map(round => round.split(' '))

    let score = 0;

    for (let i = 0; i < guide.length; i++) {
        // I need to win, so add to score a win with paper
        if (guide[i][0] === 'A' && guide[i][1] === 'Z') {
            score += 8
            // I need to draw, add to score a draw with rock
        } else if (guide[i][0] === 'A' && guide[i][1] === 'Y') {
            score += 4
            // I need to loose, add to score rock = 1
        } else if (guide[i][0] === 'B' && guide[i][1] === 'X') {
            score += 1
            // I need to win, add to score win with scissor 
        } else if (guide[i][0] === 'B' && guide[i][1] === 'Z') {
            score += 9
            // I need to loose add to score paper = 2
        } else if (guide[i][0] === 'C' && guide[i][1] === 'X') {
            score += 2
            // I need to draw add to score draw with scissor  
        } else if (guide[i][0] === 'C' && guide[i][1] === 'Y') {
            score += 6;
            // I need to lose add to score scissor = 3
        } else if (guide[i][0] === 'A' && guide[i][1] === 'X') {
            score += 3
            // i need to draw add to score draw with paper    
        } else if (guide[i][0] === 'B' && guide[i][1] === 'Y') {
            score += 5
            // i need to win add to score with with rock     
        } else if (guide[i][0] === 'C' && guide[i][1] === 'Z') {
            score += 7
        }
    }

    console.log(score);
})