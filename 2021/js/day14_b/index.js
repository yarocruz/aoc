const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let polymer_template = data.split('\n')[0].split('').join('');

    let insertion_rules = data.split('\n')
        .filter(element => element.includes('->'))
        .map(rule => rule.split('->').map(el => el.trim()))

    let ir = {}

    // convert insertion rule into an object
    for (let i = 0; i < insertion_rules.length; i++) {
        ir[insertion_rules[i][0]] = insertion_rules[i][1]
    }

    // we are going to keep track of initial letter and their counts
    let elements = {}

    console.log(elements)

    let currentPairsInPolymer = {
        // should look like this
        // NN: {
        //     count: 1,
        //     pairsItCreates: ['NC', 'CN']
        // }
    }

    initCurrentPairs(polymer_template, currentPairsInPolymer, ir);

    let step = 0;

    console.log(updateCurrentPairs(currentPairsInPolymer, ir));

    console.log(currentPairsInPolymer);

    while (step < 1) {

        updateCurrentPairs(currentPairsInPolymer, ir)

        step++
    }

    console.log(currentPairsInPolymer);

    // loop trough currentPairs
    for (let pair in currentPairsInPolymer) {
        console.log(pair);
        if (elements[ir[pair]]) {
            elements[ir[pair]] += currentPairsInPolymer[pair].count
        } else {
            elements[ir[pair]] = currentPairsInPolymer[pair].count;
        }
    }

    let highest = 0;
    let lowest = 1000000000000000;

    // loop through the element results
    for (let letter in elements) {

        if (elements[letter] > highest) {
            highest = elements[letter]
        } else if (elements[letter] < lowest) {
            console.log(elements[letter]);
            lowest = elements[letter]
        }
    }

    console.log(highest, lowest);

    console.log(highest - lowest)

})

// populate currentPairsInPolymer
function updateCurrentPairs(current, ir) {

    // TODO: CHANGE to loop through current
    for (let pair of Object.keys(current)) {
        for (let pairs of current[pair].pairsItCreates) {
            //console.log(pairs, 'from updateCurrent');
            if (current[pairs]) {
                current[pairs].count += 1
            } else {
                current[pairs] = { count: 1, pairsItCreates: [pair[0] + ir[pair], ir[pair] + pair[1]] }
            }
        }
    }
}

function initCurrentPairs(polymer, current, ir) {
    for (let i = 0; i < polymer.length - 1; i++) {
        let pair = polymer[i] + polymer[i + 1]
        current[pair] = { count: 1, pairsItCreates: [polymer[i] + ir[pair], ir[pair] + polymer[i + 1]] }
    }
}