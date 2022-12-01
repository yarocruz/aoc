const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let positions = data.split(',').map(num => parseInt(num));

    // creating a sorted array to use for the main loop
    let sortedPositions = positions.slice().sort((a, b) => a - b);

    let currentFuelCost = 0
    let leastFuelCost = Infinity;
    let step = 0;
    let increments = 0;

    // for each range in horizontal positions, we're going to increment by steps
    for (let i = sortedPositions[0]; i < sortedPositions[sortedPositions.length - 1]; i++) {
        for (let j = 0; j < positions.length; j++) {

            if (i > positions[j]) {

                for (let start = positions[j]; start < i; start++) {
                    step++
                    increments += step
                }
                currentFuelCost += increments

                // reset
                step = 0
                increments = 0
            } else {

                for (let start = i; start < positions[j]; start++) {
                    step++
                    increments += step
                }
                currentFuelCost += increments

                // reset
                step = 0
                increments = 0
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