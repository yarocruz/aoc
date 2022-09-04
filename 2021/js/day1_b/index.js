const fs = require('fs');

fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) console.log(err);

    let measurements = data.split("\n");

    let current_window = parseInt(measurements[0]) + parseInt(measurements[1]) + parseInt(measurements[2]);
    let sums = 0;
    let increases = 0;

    for (let i = 1; i < measurements.length; i++) {
        // if we're not in the second to last measurement
        if (i !== measurements.length - 2) {
            sums = parseInt(measurements[i]) + parseInt(measurements[i + 1]) + parseInt(measurements[i + 2])
            if (sums > current_window) {
                increases++
            }

            // update current window
            current_window = parseInt(measurements[i]) + parseInt(measurements[i + 1]) + parseInt(measurements[i + 2])
        }
    }

    console.log(increases)
})