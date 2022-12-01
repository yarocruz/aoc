const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let elfCalories = data.split('\n\n').map(elf => elf.split('\n').map(cal => parseInt(cal)))

    let max = 0;

    for (let i = 0; i < elfCalories.length; i++) {

        if (elfCalories[i].reduce((acc, val) => acc + val) > max) {
            max = elfCalories[i].reduce((acc, val) => acc + val)
        }
    }

    console.log(max);
})