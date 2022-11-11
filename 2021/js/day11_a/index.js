const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    // make data into 2d Grid
    let octoGrid = data.split('\n').map(line => line.split('').map(octo => parseInt(octo)))

    // 1. for each octo, increase by 1
    // 2. if the value increase is greater than 9, flash
    // a. flashing is increasing all adjacent number including diagons by 1
    // b if the octos that you flash increase over 9, we flash those as well
    // 3. numbers that flash are set to zero 

    let flashCount = 0
    let firstStepThatAllFlash;

    for (let k = 0; k < 100; k++) {

        // we create a copy of the octoGrid on every turn
        let flashMap = createOctoFlashMap(octoGrid)

        for (let i = 0; i < octoGrid.length; i++) {
            for (let j = 0; j < octoGrid[i].length; j++) {
                octoGrid[i][j]++
                if (octoGrid[i][j] > 9) {
                    flash(octoGrid, flashMap, i, j)
                    octoGrid[i][j] = 0

                }
            }
        }

        // make sure we reset everything that flashed
        for (let i = 0; i < octoGrid.length; i++) {
            for (let j = 0; j < octoGrid[i].length; j++) {
                if (octoGrid[i][j] > 9) {
                    octoGrid[i][j] = 0
                }
            }
        }

        // find the first step(k) when all octos flash
        for (let i = 0; i < flashMap.length; i++) {
            for (let j = 0; j < flashMap[i].length; j++) {
                if (flashMap[i][j] === 0) {
                    return
                } else {
                    firstStepThatAllFlash = k
                    return
                }
            }
        }

        console.log(firstStepThatAllFlash);
    }

    function createOctoFlashMap(octoGrid) {
        let flashMap = []

        for (let i = 0; i < octoGrid.length; i++) {
            let row = []
            for (let j = 0; j < octoGrid[i].length; j++) {
                row.push(0)
            }
            flashMap.push(row);
        }

        return flashMap;
    }

    function flash(octoGrid, flashMap, i, j) {

        // conditional to break out of recursion
        if (flashMap[i][j] === 1) {
            return
        }

        flashMap[i][j] = 1
        flashCount += 1
        //octoGrid[i][j] = 0

        let neighbors = getNeighbors(octoGrid, i, j)

        neighbors.forEach(neighbor => {

            if (flashMap[neighbor.ni][neighbor.nj] === 0) {
                octoGrid[neighbor.ni][neighbor.nj]++
                if (octoGrid[neighbor.ni][neighbor.nj] > 9) {
                    flash(octoGrid, flashMap, neighbor.ni, neighbor.nj)
                }
            }
        })

    }

    // we'll call this function everytime we flash
    // I realize this is the bru
    function getNeighbors(octoGrid, i, j) {

        // the neighbors will be a set of indexes
        let neighbors = []

        // if we're not in top row
        if (i !== 0) {
            neighbors.push({ ni: i - 1, nj: j })
        }

        // if we're not in bottom row
        if (i !== octoGrid.length - 1) {
            neighbors.push({ ni: i + 1, nj: j })
        }

        // if we're not in first column
        if (j !== 0) {
            neighbors.push({ ni: i, nj: j - 1 })
        }

        // if we're not in last column
        if (j !== octoGrid[i].length - 1) {
            neighbors.push({ ni: i, nj: j + 1 })
        }

        // if we're not in top row and not first column
        if (i !== 0 && j !== 0) {
            neighbors.push({ ni: i - 1, nj: j - 1 })
        }

        // if we're not in top row and not last column
        if (i !== 0 && j !== octoGrid[i].length - 1) {
            neighbors.push({ ni: i - 1, nj: j + 1 })
        }

        // if we're not in bottom row and not first column
        if (i !== octoGrid.length - 1 && j !== 0) {
            neighbors.push({ ni: i + 1, nj: j - 1 })
        }

        // if we're not in bottom row and not last column
        if (i !== octoGrid.length - 1 && j !== octoGrid[i].length - 1) {
            neighbors.push({ ni: i + 1, nj: j + 1 })
        }

        return neighbors;

    }

    console.log(octoGrid);
    console.log(flashCount)

})