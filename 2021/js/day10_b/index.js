const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let braces = data.split('\n').map(line => line.split(''))

    let incompletes = []
    let score = 0
    let points = []

    for (let i = 0; i < braces.length; i++) {

        let closedBraces = []

        for (let j = 0; j < braces[i].length; j++) {
            if (braces[i][j] === '(') {
                closedBraces.unshift(')')
            } else if (braces[i][j] === '{') {
                closedBraces.unshift('}')
            } else if (braces[i][j] === '[') {
                closedBraces.unshift(']')
            } else if (braces[i][j] === '<') {
                closedBraces.unshift('>')
            } else {
                if (braces[i][j] !== closedBraces.shift()) {
                    // resetting as a way of ignoring the corrupted lines
                    closedBraces = []
                    break
                }
            }
        }

        // pushing to incompletes only the ones we 'ignored'
        if (closedBraces.length !== 0) {
            incompletes.push(closedBraces)
        }
    }

    for (let i = 0; i < incompletes.length; i++) {

        for (let j = 0; j < incompletes[i].length; j++) {
            switch (incompletes[i][j]) {
                case ')':
                    score = score * 5 + 1;
                    break;
                case ']':
                    score = score * 5 + 2;
                    break;
                case '}':
                    score = score * 5 + 3;
                    break;
                case '>':
                    score = score * 5 + 4;
                    break;
                default:
                    console.log('Not a valid brace');
            }
        }
        points.push(score)
        score = 0
    }

    let sorted = points.sort((a, b) => a - b)
    // since we know we always get an odd result of points,
    // We can always find a middle by dividing and flooring
    console.log(sorted[Math.floor(sorted.length / 2)]);

})