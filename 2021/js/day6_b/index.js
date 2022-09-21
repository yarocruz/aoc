const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)

    let fish = data.split(',').map(num => parseInt(num));

    // we're going to use an array as a queue to track how 
    // may fishes are at certain states
    // the states will be the index of the array from 0 to 9, the values
    // will be amount of of those fishes in that state
    let fishStates = new Array(9).fill(0)

    // we count how many fishes are at certain states before the first day
    fish.forEach(f => fishStates[f]++)

    // loop for 256 days
    for (let i = 1; i <= 256; i++) {
        // each day we 'shift out' a fish at day 0
        let newCount = fishStates.shift()
        // we add how many fishes are on day 6 plush the the one on Day 0
        fishStates[6] += newCount
        // and push to Day 8 the amount the brand new fishes
        fishStates.push(newCount)
    }

    let total = fishStates.reduce((acc, num) => {
        return acc + num
    }, 0)

    console.log(total);

})
