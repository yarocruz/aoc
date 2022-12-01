const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let signal_wires = data.split('\n').map(line => line.split('|').map(l => l.trim().split(' ')));

    let counter = 0;

    // string with length 5 is either 2, 3, 5
    // string with length 6 is either 0, 6, 9

    // if str of length 5 includes the letters of str length 2, this is a 3

    // if str of lenght 5, if it's missing the letter that a 6 and 9 is missing this is a 5

    // if str on lenght 5, it it has the the two letters that 6 and 9 is missing this is a 2

    // if str of length 6, if it includes all letters in str lenght 2 (1), then it's a 9

    // if str of length 6, if it only includes one of the letters in str length 2(1) then it's a 6

    // if str of length 6, has all the the letters in str lgth 7(8), except of 1

    /** Lets find a 3 */

    let one, four, seven, eight, three, five, two, six, nine, zero;

    // we also want to indetify which letter corresponds the segments
    let top, middle, bottom, topRight, bottomRight, topLeft, bottomLeft;

    // keep track 
    let output = ''
    let total = 0

    for (let i = 0; i < signal_wires.length; i++) {
        for (let j = 0; j < signal_wires[i][0].length; j++) {
            //console.log(signal_wires[1][0][j]);
            // finding a 1
            if (signal_wires[i][0][j].length === 2) {
                one = signal_wires[i][0][j]
                console.log(one, '1');
            }

            // finding a 4
            if (signal_wires[i][0][j].length === 4) {
                four = signal_wires[i][0][j]
                console.log(four, '4');
            }

            // find a 7
            if (signal_wires[i][0][j].length === 3) {
                seven = signal_wires[i][0][j]
                // finding top seg
                console.log(seven, '7');
            }

            // finding an 8
            if (signal_wires[i][0][j].length === 7) {
                eight = signal_wires[i][0][j]
                console.log(eight, '8');
            }
        }

        for (let j = 0; j < signal_wires[i][0].length; j++) {
            // // finding a 3
            if (signal_wires[i][0][j].length === 5
                && signal_wires[i][0][j].includes(one[0])
                && signal_wires[i][0][j].includes(one[1])) {
                three = signal_wires[i][0][j]
                console.log(three, '3');

                topLeft = four
                    .split('')
                    .filter(letter => !one.includes(letter))
                    .join('')
                    .split('')
                    .filter(letter => !three.includes(letter))
                    .join('');

                console.log(topLeft, 'topLeft');

                middle = four
                    .split('')
                    .filter(letter => !one.includes(letter))
                    .join('')
                    .split('')
                    .filter(letter => letter !== topLeft)
                    .join('')

                console.log(middle, 'middle');

                top = seven.split('').filter(letter => !one.includes(letter)).join('');
                console.log(top, 'top');

                // bottom segment
                bottom = three
                    .split('')
                    .filter(letter => !one.includes(letter))
                    .join('')
                    .split('')
                    .filter(letter => {
                        return letter !== top && letter !== middle
                    })
                    .join('')

                console.log(bottom, 'bottom');

            }
        }

        for (let j = 0; j < signal_wires[i][0].length; j++) {
            // finding a 5
            if (signal_wires[i][0][j].length === 5
                && signal_wires[i][0][j].includes(topLeft)) {
                five = signal_wires[i][0][j];
                console.log(five, '5');
                // we look up which part of the one segment is present to identify 
                // top and bottom right
                bottomRight = five
                    .split('')
                    .filter(letter => one.includes(letter))
                    .join('')

                console.log(bottomRight, 'bottomRight');

                topRight = one
                    .split('')
                    .filter(letter => letter != bottomRight)
                    .join('');

                console.log(topRight, 'topRight');
            }
        }

        for (let j = 0; j < signal_wires[i][0].length; j++) {
            //  finding a 2
            if (signal_wires[i][0][j].length === 5
                && !signal_wires[i][0][j].includes(bottomRight)
                && signal_wires[i][0][j].includes(topRight)) {
                two = signal_wires[i][0][j]
                console.log(two, '2');

                bottomLeft = two
                    .split('')
                    .filter(letter => !one.includes(letter))
                    .join('')
                    .split('')
                    .filter(letter => {
                        return letter !== bottom && letter !== top && letter !== middle
                    })
                    .join('')

                console.log(bottomLeft, 'bottomLeft');
            }
        }

        for (let j = 0; j < signal_wires[i][0].length; j++) {
            // finding a 9
            if (signal_wires[i][0][j].length === 6
                && !signal_wires[i][0][j].includes(bottomLeft)
                && signal_wires[i][0][j].includes(topRight)) {
                nine = signal_wires[i][0][j];
                console.log(nine, '9');
            }

            // finding a 6
            if (signal_wires[i][0][j].length === 6
                && !signal_wires[i][0][j].includes(topRight)
                && signal_wires[i][0][j].includes(bottomLeft)) {
                six = signal_wires[i][0][j];
                console.log(six, '6');
            }

            // finding a 0
            if (signal_wires[i][0][j].length === 6
                && !signal_wires[i][0][j].includes(middle)) {
                zero = signal_wires[i][0][j];
                console.log(zero, '0');
            }
        }

        // after identifying the numbers, we loop through the outputs

        for (let k = 0; k < signal_wires[i][1].length; k++) {
            //console.log(signal_wires[i][1][k].split('').sort().join(''));
            switch (signal_wires[i][1][k].split('').sort().join('')) {
                case zero.split('').sort().join(''):
                    output += '0'
                    break;
                case one.split('').sort().join(''):
                    output += '1'
                    break;
                case two.split('').sort().join(''):
                    output += '2'
                    break;
                case three.split('').sort().join(''):
                    output += '3'
                    break;
                case four.split('').sort().join(''):
                    output += '4'
                    break;
                case five.split('').sort().join(''):
                    output += '5'
                    break;
                case six.split('').sort().join(''):
                    output += '6'
                    break;
                case seven.split('').sort().join(''):
                    output += '7'
                    break;
                case eight.split('').sort().join(''):
                    output += '8'
                    break;
                case nine.split('').sort().join(''):
                    output += '9'
                    break;
                default:
                    console.log('We did not find a number here');
            }
        }

        console.log(output, 'output');

        total += parseInt(output)
        // reset output for next iter
        output = ''
    }





    //}

    //console.log(signal_wires);
    //console.log(output);
    console.log(total);
})