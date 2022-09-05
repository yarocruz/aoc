const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)

    /* TEST CASE */
    // let bytes = [
    //     '00100',
    //     '11110',
    //     '10110',
    //     '10111',
    //     '10101',
    //     '01111',
    //     '00111',
    //     '11100',
    //     '10000',
    //     '11001',
    //     '00010',
    //     '01010',
    // ]

    let bytes = data.split('\n');

    // defining columns and rows to make it clearer
    // how we're going to loop, which is col first, row second
    let col_size = bytes[0].length;
    let row_size = bytes.length;

    let gamma_rate = '', epsilon_rate = '';
    let ones = 0, zeroes = 0;

    for (let i = 0; i < col_size; i++) {
        for (let j = 0; j < row_size; j++) {
            let bit = bytes[j];

            // for every row, check the bit at col i
            if (bit[i] === '1') ones++;
            if (bit[i] === '0') zeroes++;

        }

        // check for most and least common bit
        if (ones > zeroes) {
            gamma_rate += '1'
            epsilon_rate += '0'
        } else {
            gamma_rate += '0'
            epsilon_rate += '1'
        }

        // reset zeroes and ones counter
        ones = 0;
        zeroes = 0;
    }

    // convert the binary strings to decimal integers
    let power_consuption = parseInt(gamma_rate, 2) * parseInt(epsilon_rate, 2);

    console.log(power_consuption);

})