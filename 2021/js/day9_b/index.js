const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) console.log(err);

    // make data a 2d array
    let height_map = data.split('\n').map(line => line.split('').map(num => parseInt(num)));

    let basins = []

    function countBasins(i, j) {
        // Our recursive condition stop
        if (j < 0 || j >= height_map.length || i < 0 || i >= height_map[0].length
            || height_map[j][i] === 9 || height_map[j][i] === -1) {
            return
        }
        console.log(height_map[j][i]);
        // changing a point in heightmap with -1 just to mark as visited
        height_map[j][i] = -1
        // we count here each point in the basins, and add it to the last index in basins array
        basins[basins.length - 1] += 1;
        // we recursively check the top, bot, left, right points
        countBasins(i + 1, j)
        countBasins(i - 1, j)
        countBasins(i, j + 1)
        countBasins(i, j - 1)
    }

    for (let i = 0; i < height_map.length; i++) {
        for (let j = 0; j < height_map[0].length; j++) {
            basins.push(0)
            countBasins(j, i)
        }
    }

    console.log(basins.sort((a, b) => b - a).slice(0, 3).reduce((acc, num) => acc * num))

})

/**
 * 
 * def count_groups(i, j):
    if j < 0 or j >= len(grid) or i < 0 or i >= len(grid[0]) or grid[j][i] == 9 or grid[j][i] == -1:
        return
    grid[j][i] = -1
    groups[len(groups)-1] += 1
    count_groups(i+1, j)
    count_groups(i-1, j)
    count_groups(i, j+1)
    count_groups(i, j-1)
for i in range(0, len(grid)):
    for j in range(0, len(grid[0])):
        groups.append(0)
        count_groups(j, i)
print(math.prod(sorted(groups, reverse=True)[:3]))
 */

