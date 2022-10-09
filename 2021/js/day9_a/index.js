const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    // make data a 2d array
    let height_map = data.split('\n').map(line => line.split('').map(num => parseInt(num)));

    let total = 0

    // for each num in a row, we are going to determine if it's a low point
    // by comparing the poing to it's top, bottom, left, and right are greater
    // the the current point
    for (let i = 0; i < height_map.length; i++) {
        for (let j = 0; j < height_map[i].length; j++) {
            if (isLowPoint(height_map, i, j)) {
                console.log(height_map[i][j])
                // we find the risk level by adding 1 to the low point.
                // then we add them all together
                total += height_map[i][j] + 1
            }
        }
    }

    console.log(total);

})

function isLowPoint(height_map, i, j) {

    let top, bottom, left, right;

    // if we're not in top row
    if (i !== 0) {
        top = height_map[i - 1][j];
    }

    // if we're not in bottom row
    if (i !== height_map.length - 1) {
        bottom = height_map[i + 1][j];
    }

    // if we're not in first column
    if (j !== 0) {
        left = height_map[i][j - 1];
    }

    // if we're not in last column
    if (j !== height_map[i].length - 1) {
        right = height_map[i][j + 1];
    }

    // 2 adjacent
    // top left corner
    if (i == 0 && j == 0) {
        if (height_map[i][j] < bottom && height_map[i][j] < right) {
            return true
        }
    }
    // top right corner
    if (i == 0 && j == height_map[i].length - 1) {
        if (height_map[i][j] < bottom && height_map[i][j] < left) {
            return true
        }
    }
    // bottom left corner
    if (i == height_map.length - 1 && j == 0) {
        if (height_map[i][j] < top && height_map[i][j] < right) {
            return true
        }
    }
    // bottom right corner
    if (i == height_map.length - 1 && j == height_map[i].length - 1) {
        if (height_map[i][j] < top && height_map[i][j] < left) {
            return true
        }
    }

    // 3 adjacent
    // if we're in the top row, but we're not in the last column
    if (i == 0 && j !== height_map[i].length - 1) {
        if (height_map[i][j] < bottom && height_map[i][j] < right && height_map[i][j] < left) {
            return true;
        }
    }
    // if we're in the bottom row, but not in last column
    if (i == height_map.length - 1 && j !== height_map[i].length - 1) {
        if (height_map[i][j] < top && height_map[i][j] < right && height_map[i][j] < left) {
            return true;
        }
    }
    // if we're not top and bottom row, but we're in first column
    if (i !== 0 && i !== height_map.length - 1 && j == 0) {
        if (height_map[i][j] < top && height_map[i][j] < bottom && height_map[i][j] < right) {
            return true;
        }
    }
    // if we're not top and bottom, but were's in last column
    if (i !== 0 && i !== height_map.length - 1 && j == height_map[i].length - 1) {
        if (height_map[i][j] < top && height_map[i][j] < bottom && height_map[i][j] < left) {
            return true;
        }
    }

    // four adjacent
    if (height_map[i][j] < bottom
        && height_map[i][j] < right &&
        height_map[i][j] < left
        && height_map[i][j] < top) {
        return true
    }

    return false
}