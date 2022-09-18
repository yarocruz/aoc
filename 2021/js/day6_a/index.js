const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)

    let fish = data.split(',').map(num => parseInt(num));

    // loop for number of gives days
    for (let i = 0; i < 80; i++) {
        for (let j = 0; j < fish.length; j++) {
            if (fish[j] === 0) {
                // reset to 6 and create new fish
                fish[j] = 6
                fish.push(9)
            } else {
                fish[j] -= 1
            }
        }
    }

    console.log(fish.length);

})
