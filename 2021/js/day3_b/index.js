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

    // defining only columns, rows will dynamically shrink  
    let col_size = bytes[0].length;

    // keep track of the ones and zeroes
    let ones = 0, zeroes = 0;

    // create copies of input byte strings
    let og_rating = bytes.map(byte => byte);
    let co2_rating = bytes.map(byte => byte);

    for (let i = 0; i < col_size; i++) {

        // loop and count the bits at col[i] from the og_rating
        for (let j = 0; j < og_rating.length; j++) {
            // stop count loop if we have 1 byte left
            if (og_rating.length === 1) break;

            bit = og_rating[j];

            // for every row, check the bit at col i
            if (bit[i] === '1') ones++;
            if (bit[i] === '0') zeroes++;
        }

        // make sure again we stop at 1
        if (og_rating.length !== 1) {
            if (ones > zeroes) {
                og_rating = og_rating.filter(byte => byte[i] === '1')
            } else if (ones === zeroes) {
                og_rating = og_rating.filter(byte => byte[i] === '1')
            } else {
                og_rating = og_rating.filter(byte => byte[i] === '0')
            }
        }

        // reset zeroes and ones counter
        ones = 0;
        zeroes = 0;

        // loop and count the bits at col[i] from the co2_rating
        for (let j = 0; j < co2_rating.length; j++) {
            // stop count loop if we have 1 byte left
            if (co2_rating.length === 1) break;

            bit = co2_rating[j];

            // for every row, check the bit at col i
            if (bit[i] === '1') ones++;
            if (bit[i] === '0') zeroes++;
        }

        // make sure again we stop at 1
        if (co2_rating.length !== 1) {
            if (ones > zeroes) {
                co2_rating = co2_rating.filter(byte => byte[i] === '0')
            } else if (ones === zeroes) {
                co2_rating = co2_rating.filter(byte => byte[i] === '0')
            } else {
                co2_rating = co2_rating.filter(byte => byte[i] === '1')
            }
        }

        // reset zeroes and ones counter
        ones = 0;
        zeroes = 0;
    }

    // convert the binary strings to decimal integers
    let life_support_rating = parseInt(co2_rating.join(), 2) * parseInt(og_rating.join(), 2);
    console.log(life_support_rating);

})