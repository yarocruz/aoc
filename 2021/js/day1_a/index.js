const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let measurements = data.split("\n");

    let increases = 0;
    let previous = parseInt(measurements[0]);

    for (let i = 1; i < measurements.length; i++) {
        if (parseInt(measurements[i]) > parseInt(previous)) {
            increases += 1;
        }
        previous = parseInt(measurements[i])
    }

    console.log(increases);

})