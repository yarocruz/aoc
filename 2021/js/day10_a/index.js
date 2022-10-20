const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let braces = data.split('\n').map(line => line.split(''))

    let incorrects = []
    let points = 0

    for (let i = 0; i < braces.length; i++) {

        let closedBraces = []

        for (let j = 0; j < braces[i].length; j++) {

            if (braces[i][j] === '(') {
                closedBraces.push(')')
            } else if (braces[i][j] === '{') {
                closedBraces.push('}')
            } else if (braces[i][j] === '[') {
                closedBraces.push(']')
            } else if (braces[i][j] === '<') {
                closedBraces.push('>')
            } else {
                if (braces[i][j] !== closedBraces.pop()) {
                    incorrects.push(braces[i][j])
                }
            }
        }
    }

    for (let brace of incorrects) {
        switch (brace) {
            case ')':
                points += 3;
                break;
            case ']':
                points += 57;
                break;
            case '}':
                points += 1197;
                break;
            case '>':
                points += 25137;
                break;
            default:
                console.log('Not a valid brace');
        }
    }

    console.log(points);

})