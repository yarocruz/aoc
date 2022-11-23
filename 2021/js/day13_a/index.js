const fs = require('fs')

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err)


    let points = data.split('\n').map(input => input.split(',').map(num => parseInt(num)))

    // when folding, you first split the array from the fold point (row) 
    // the second you reverse the rows and put row[i]

    // we can splice the grid by it's fold points
    // then we can either loop trough the second half in reverse or reverse second half
    // an fill the "#" in the indexes on the first half

    // when "folding" you don't keep the row or col

    // we can firs use Array.slice(7) to create a second half copy
    // then we can splice out the original from the index

    // one thing to watch out for is that when we splice(fold) is to know if 
    // that row or col will be empty

    // we need to get rid, pop out the row and col when folding

    // what if the fold line is not even?

    let [row, col] = findHighestXandYValue(points)
    console.log(row, col)

    // create 2darray/grid
    let grid = createGrid(row, col)
    console.log(grid.length, grid[0].length);

    fillInitialGridWithPoints(points, grid)

    let rightSide = splitLeft(grid, 655)
    console.log(rightSide)
    console.log(rightSide[0].length, grid[0].length)
    console.log(rightSide.length, grid.length)

    // when extracting this to a function
    // we need to check if the rightSide ends short the the original grid/left
    // we loop from the end
    // if opposite, than we need to unshift() the overlapping cols
    for (let i = 0; i < rightSide.length; i++) {
        for (let j = 0; j < rightSide[i].length; j++) {
            if (rightSide[i][j] === "#") {
                // here since the rightSide ended up being short than grid
                // we make sure we place the "#" to the correct index
                grid[i][grid[i].length - 1 - j] = "#"
            }
        }
    }

    console.log(grid);

    // let secondHalf = splitUp(grid, 447)
    // console.log(secondHalf);

    // // fill in the remaining grid with the hashes from the second-half
    // for (let i = 0; i < secondHalf.length; i++) {
    //     for (let j = 0; j < secondHalf[i].length; j++) {
    //         if (secondHalf[i][j] === "#") {
    //             grid[i][j] = "#"
    //         }
    //     }
    // }

    let result = countFilledDots(grid)

    console.log(result);
})

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
    return grid.splice(y).reverse()
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