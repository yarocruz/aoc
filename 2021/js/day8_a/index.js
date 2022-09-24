const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let signal_wires = data.split('\n').map(line => line.split('|').map(l => l.trim().split(' ')));

    let counter = 0;

    //console.log(signal_wires[0][1].length);

    for (let i = 0; i < signal_wires.length; i++) {
        if (signal_wires[i][1]) {
            for (let j = 0; j < signal_wires[i][1].length; j++) {
                // check length of the strings for 
                // the unique values of 1, 4, 7, or 8
                // and count them

                // the lengths we check for is the segment length
                if (signal_wires[i][1][j].length === 2 ||
                    signal_wires[i][1][j].length === 3 ||
                    signal_wires[i][1][j].length === 4 ||
                    signal_wires[i][1][j].length === 7) {
                    counter++
                }
            }
        }
    }

    console.log(counter);
})