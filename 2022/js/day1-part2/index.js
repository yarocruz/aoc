const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let elfCalories = data.split('\n\n').map(elf => elf.split('\n').map(cal => parseInt(cal)))

    let listOfElfCalories = [];

    for (let i = 0; i < elfCalories.length; i++) {

        listOfElfCalories.push(elfCalories[i].reduce((acc, val) => acc + val))

    }

    // sort from hightest to lowest
    listOfElfCalories.sort((a, b) => b - a);

    let topThreeTotal = listOfElfCalories[0] + listOfElfCalories[1] + listOfElfCalories[2]

    console.log(topThreeTotal);
})