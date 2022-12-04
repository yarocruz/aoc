const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let pairs = data
        .trim()
        .split('\n')
        .map(input => input.split(',').map(range => range.split('-')))

    console.log(pairs);

    // from the pairs find if one pair, ex 2-8 fully contains 3-7

    let pairsThatFitWithinAPair = 0

    for (let i = 0; i < pairs.length; i++) {
        let rightSideNum1 = Number(pairs[i][1][0]) // this would be 6 in first ex.
        let rightSideNum2 = Number(pairs[i][1][1])
        let leftSideNum1 = Number(pairs[i][0][0])
        let leftSideNum2 = Number(pairs[i][0][1])

        console.log(rightSideNum1, rightSideNum2, leftSideNum1, leftSideNum2);

        // if left fits within right or they're equal
        if (leftSideNum1 >= rightSideNum1 && leftSideNum2 <= rightSideNum2) {
            pairsThatFitWithinAPair += 1
            // if right fits within left or they're equal   
        } else if (rightSideNum1 >= leftSideNum1 && rightSideNum2 <= leftSideNum2) {
            pairsThatFitWithinAPair += 1
        }
    }

    console.log(pairsThatFitWithinAPair);
})