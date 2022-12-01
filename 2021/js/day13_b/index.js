const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)

    let points = data.split('\n').map(input => input.split(',').map(num => parseInt(num)))

    let [row, col] = findHighestXandYValue(points)

    let grid = createGrid(row, col)

    fillInitialGridWithPoints(points, grid)

    let directions = [
        ['x', 655],
        ['y', 447],
        ['x', 327],
        ['y', 223],
        ['x', 163],
        ['y', 111],
        ['x', 81],
        ['y', 55],
        ['x', 40],
        ['y', 27],
        ['y', 13],
        ['y', 6],
    ]

    // let directions = [
    //     ['y', 7],
    //     ['x', 5],

    // ]

    processFoldDirections(directions, grid)

    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''));
    }

    // let result = countFilledDots(grid)

    // console.log(result);
})

function processFoldDirections(directions, grid) {
    // loop trouch directions
    for (let i = 0; i < directions.length; i++) {
        // if direction is x, invoke split left
        if (directions[i][0] === 'x') {
            let rightSide = splitLeft(grid, directions[i][1])

            for (let i = 0; i < rightSide.length; i++) {
                for (let j = 0; j < rightSide[i].length; j++) {
                    if (rightSide[i][j] === "#") {
                        // if the rightside is greater than left side
                        // we add those to the front
                        if (grid[i].length - 1 - j < 0) {
                            grid[i].unshift(rightSide[i][j])
                        }
                        // here since the rightSide ended up being short than grid
                        // we make sure we place the "#" to the correct index
                        grid[i][grid[i].length - 1 - j] = "#"
                    }
                }
            }
        }

        // if direction is y, invoke split up
        if (directions[i][0] === 'y') {
            let secondHalf = splitUp(grid, directions[i][1])

            // fill in the remaining grid with the hashes from the second-half
            for (let i = 0; i < secondHalf.length; i++) {
                if (grid.length - 1 - i < 0) {
                    grid.unshift(secondHalf[grid.length - 1 - i])
                }
                for (let j = 0; j < secondHalf[i].length; j++) {
                    if (secondHalf[i][j] === "#") {

                        grid[grid.length - 1 - i][j] = "#"
                    }
                }
            }
        }
    }
}

function countFilledDots(grid) {
    let count = 0

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === "#") {
                count += 1
            }
        }
    }

    return count
}

function splitLeft(grid, x) {
    let rightSide = []

    for (let i = 0; i < grid.length; i++) {
        let fold = grid[i].splice(x);
        fold.shift()
        rightSide.push(fold)
    }

    return rightSide
}

function splitUp(grid, y) {
    let fold = grid.splice(y)
    fold.shift()
    return fold
}

function fillInitialGridWithPoints(points, grid) {

    for (let i = 0; i < points.length; i++) {

        let x = points[i][1]
        let y = points[i][0]

        grid[x][y] = "#"

    }
}

function findHighestXandYValue(points) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < points.length; i++) {

        if (points[i][1] > x) x = points[i][1]
        if (points[i][0] > y) y = points[i][0]
    }

    return [x, y]
}

function createGrid(row, col) {
    let grid = []

    for (let x = 0; x <= row; x++) {
        grid.push([])
        for (let y = 0; y <= col; y++) {
            grid[x].push('.')
        }
    }

    return grid;
}