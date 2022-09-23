const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let positions = data.split(',').map(num => parseInt(num));

    // creating a sorted array to use for the main loop
    let sortedPositions = positions.slice().sort((a, b) => a - b);

    let currentFuelCost = 0
    let leastFuelCost = Infinity;

    // for each range in horizontal positions, we're going to subtract with main positions
    for (let i = sortedPositions[0]; i < sortedPositions[sortedPositions.length - 1]; i++) {
        for (let j = 0; j < positions.length; j++) {

            if (i > positions[j]) {
                currentFuelCost += (i - positions[j])
            } else {
                currentFuelCost += (positions[j] - i)
            }
        }

        if (currentFuelCost < leastFuelCost) {
            leastFuelCost = currentFuelCost
        }

        // reset 
        currentFuelCost = 0

    }

    console.log(leastFuelCost)
})