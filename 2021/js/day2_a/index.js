const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)

    let horizontal = 0;
    let depth = 0;

    let course = data.split('\n');

    /* TEST CASE */
    // let course = [
    //     'forward 5',
    //     'down 5',
    //     'forward 8',
    //     'up 3',
    //     'down 8',
    //     'forward 2'
    // ]

    for (let i = 0; i < course.length; i++) {

        let direction = course[i].split(' ');
        switch (direction[0]) {
            case 'forward':
                horizontal += parseInt(direction[1]);
                break;
            case 'down':
                depth += parseInt(direction[1]);
                break;
            case 'up':
                depth -= parseInt(direction[1]);
                break;
        }
    }

    console.log(horizontal * depth)

})