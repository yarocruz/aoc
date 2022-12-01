const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let polymer_template = data.split('\n')[0].split('').join('');
    console.log(polymer_template);

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

    // loop trough final polymer output
    for (let i = 0; i < polymer_template.length; i++) {
        if (elements[polymer_template[i]]) {
            elements[polymer_template[i]] += 1
        } else {
            elements[polymer_template[i]] = 1;
        }
    }

    console.log(elements)

    let step = 0;

    let copy_polymer_template;
    let visitedPairs = new Set()

    while (step < 40) {

        copy_polymer_template = polymer_template[0]

        // loop through pairs
        for (let i = 0; i < polymer_template.length - 1; i++) {

            let pair = polymer_template[i] + polymer_template[i + 1]


            // if (visitedPairs.has(pair)) {
            //     // TODO: we need to change this
            //     //copy_polymer_template += ir[pair] + polymer_template[i + 1]

            if (elements[ir[pair]]) {
                elements[ir[pair]] += 1
            } else {
                elements[ir[pair]] = 1;
            }

            //     //console.log(copy_polymer_template);
            //     // we can do some here where if we already have the pair in the altered string polymer, we stop concatenating
            // } else {
            //     visitedPairs.add(pair)
            //     copy_polymer_template += ir[pair] + polymer_template[i + 1]
            //     console.log(copy_polymer_template);
            //     if (elements[ir[pair]]) {
            //         elements[ir[pair]] += 1
            //     } else {
            //         elements[ir[pair]] = 1;
            //     }

            // }

        }

        //polymer_template = copy_polymer_template

        step++
    }

    console.log(visitedPairs);
    console.log(polymer_template);

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

// we need to make a function that checks if all the pairs in the insertion rules
// are already present in the polymer string
// function allPairsInPolymer(ir, polymer) {
//     let keys = Object.keys(ir);
//     for (let k = 0; k < keys.length; k++) {
//         for (let i = 0; i < polymer.length - 1; i++) {
//             let pair = polymer[i] + polymer[i + 1]
//             console.log(keys[k], pair);
//             if (keys[k] !== pair) return false
//         }
//     }

//     return true;
// }

// finds and returns an array of all the pairs in polymer template
// function findPairs(template) {
//     let pairs = []

//     for (let i = 0; i < template.length - 1; i++) {
//         pairs.push(template[i] + template[i + 1])
//     }

//     return pairs;
// }

// function loopAndInsert(currentPairs, insertion_rules, insertion_point, polymer_template) {
//     for (let i = 0; i < currentPairs.length; i++) {
//         // loop through the insertion rules
//         for (let j = 0; j < insertion_rules.length; j++) {
//             // when we find the pair in the insertion rule eg: "ir[0]"
//             if (currentPairs[i] === insertion_rules[j][0]) {
//                 // TODO: we need to change this
//                 polymer_template.splice(insertion_point, 0, insertion_rules[j][1])
//             }
//         }

//         insertion_point += 2
//     }
// }