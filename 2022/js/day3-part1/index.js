const fs = require('fs')

fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let rucksacks = data
        .split('\n')
        .map(input => input.trim())

    let appearsInBothCompartments = []

    // we split by half for each string
    for (let items of rucksacks) {
        let firstHalf = items.slice(0, items.length / 2)
        let secondHalf = items.slice(items.length / 2)
        for (let i = 0; i < firstHalf.length; i++) {
            if (secondHalf.includes(firstHalf[i])) {
                appearsInBothCompartments.push(firstHalf[i])
                break;
            }
        }
    }

    // value look array
    let values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    console.log(values);

    // a - z evaluates in priority to 1 - 26
    // A - Z evaluates in priority to 27 - 52

    let total = 0;

    appearsInBothCompartments.forEach(letter => {
        // we + 1 the index value because we want the value of a to equal 1 and not 0
        let value = values.indexOf(letter) + 1
        total += value;
    })

    console.log(total);

})