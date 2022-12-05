const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    let [_, moves] = data.split('\n\n')

    // let's just get the numbers in moves
    let moveArray = moves.split('\n').map(line => line.split(' ').filter(element => parseInt(element)))

    // we need to the stacks into an array of arrays
    // Ex
    // let stacks = [
    //     ["N", "Z"],
    //     ["D", "C", "M"],
    //     ["P"]
    // ]

    // [J]             [F] [M]            
    // [Z] [F]     [G] [Q] [F]            
    // [G] [P]     [H] [Z] [S] [Q]        
    // [V] [W] [Z] [P] [D] [G] [P]        
    // [T] [D] [S] [Z] [N] [W] [B] [N]    
    // [D] [M] [R] [J] [J] [P] [V] [P] [J]
    // [B] [R] [C] [T] [C] [V] [C] [B] [P]
    // [N] [S] [V] [R] [T] [N] [G] [Z] [W]
    //  1   2   3   4   5   6   7   8   9 

    // curios to see how, and if folks we're able to to convert the above
    // without having to do it by hand
    let stacks = [
        ['J', 'Z', 'G', 'V', 'T', 'D', 'B', 'N'],
        ['F', 'P', 'W', 'D', 'M', 'R', 'S'],
        ['Z', 'S', 'R', 'C', 'V'],
        ['G', 'H', 'P', 'Z', 'J', 'T', 'R'],
        ['F', 'Q', 'Z', 'D', 'N', 'J', 'C', 'T'],
        ['M', 'F', 'S', 'G', 'W', 'P', 'V', 'N'],
        ['Q', 'P', 'B', 'V', 'C', 'G'],
        ['N', 'P', 'B', 'Z'],
        ['J', 'P', 'W']

    ]

    for (let i = 0; i < moveArray.length; i++) {
        let counter = 0;
        // we can do a while loop that to goes up move 1 moveArray[i][0]

        while (counter < Number(moveArray[i][0])) {
            // we shift and push according to the next rules
            let letter = stacks[Number(moveArray[i][1]) - 1].shift()
            stacks[Number(moveArray[i][2]) - 1].unshift(letter)
            counter += 1
        }
    }

    let output = []

    for (let i = 0; i < stacks.length; i++) {
        output.push(stacks[i][0])
    }

    console.log(stacks);
    console.log(output.join(""));

})