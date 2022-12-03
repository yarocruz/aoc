const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let rucksacks = data
        .split('\n')
        .map(input => input.trim())

    let groupings = []

    // create groups of three
    for (let i = 0; i < rucksacks.length; i += 3) {
        let group = []

        group.push(rucksacks[i])
        group.push(rucksacks[i + 1])
        group.push(rucksacks[i + 2])

        groupings.push(group)
    }

    let appearsInGroupsOfThree = []

    // for part 2 we need to every 3 lines
    for (let i = 0; i < groupings.length; i++) {

        group: // labeling this loop to be able to break out from the inner string loop
        for (let j = 0; j < groupings[i].length; j++) {
            // we just need to loop through the first string in grouping
            for (let k = 0; k < groupings[i][0].length; k++) {
                // and if both, the second and third string includes one of the characters
                // we push into our array thats tracking the most common and break out of outer loop
                if (groupings[i][1].includes(groupings[i][0][k])
                    && groupings[i][2].includes(groupings[i][0][k])) {
                    appearsInGroupsOfThree.push(groupings[i][0][k])
                    break group;
                }
            }
        }
    }

    // value lookup array
    let values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    // a - z evaluates in priority to 1 - 26
    // A - Z evaluates in priority to 27 - 52

    let total = 0;

    appearsInGroupsOfThree.forEach(letter => {
        // we + 1 the index value because we want the value of a = 1 and not 0
        let value = values.indexOf(letter) + 1
        total += value;
    })

    console.log(total);

})